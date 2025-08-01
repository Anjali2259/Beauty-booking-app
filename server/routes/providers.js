const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('./auth');
const Provider = require('../models/Provider');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const router = express.Router();

// Get all providers with filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      location,
      businessType,
      specialization,
      search,
      sortBy = 'rating.average',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = { isActive: true };

    // Business type filter
    if (businessType) {
      query.businessType = businessType;
    }

    // Specialization filter
    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    // Text search
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specializations: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const providers = await Provider.find(query)
      .populate('user', 'firstName lastName avatar')
      .select('-contact.email -settings -verification.license -verification.certifications')
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOptions);

    const total = await Provider.countDocuments(query);

    res.json({
      success: true,
      data: {
        providers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get providers',
      error: error.message
    });
  }
});

// Get provider by ID (public profile)
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findOne({
      _id: req.params.id,
      isActive: true
    })
      .populate('user', 'firstName lastName avatar')
      .select('-settings -verification.license -verification.certifications');

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    // Get provider's services
    const services = await Service.find({
      provider: provider._id,
      isActive: true
    }).select('name description category duration price rating images');

    // Get recent reviews (if implemented)
    const recentBookings = await Booking.find({
      provider: provider._id,
      status: 'completed',
      'review.hasReviewed': true
    })
      .populate('customer', 'firstName lastName avatar')
      .select('review createdAt')
      .sort({ 'review.reviewedAt': -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        provider,
        services,
        reviews: recentBookings.map(booking => ({
          rating: booking.review.rating,
          comment: booking.review.comment,
          reviewedAt: booking.review.reviewedAt,
          customer: booking.customer
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get provider',
      error: error.message
    });
  }
});

// Create provider profile
router.post('/profile', verifyToken, [
  body('businessName').trim().isLength({ min: 2, max: 100 }).withMessage('Business name must be 2-100 characters'),
  body('businessType').isIn(['salon', 'spa', 'individual', 'mobile', 'home-studio']).withMessage('Invalid business type'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('specializations').isArray({ min: 1 }).withMessage('At least one specialization is required'),
  body('location.address.street').notEmpty().withMessage('Street address is required'),
  body('location.address.city').notEmpty().withMessage('City is required'),
  body('location.address.state').notEmpty().withMessage('State is required'),
  body('location.address.zipCode').notEmpty().withMessage('ZIP code is required'),
  body('contact.phone').isMobilePhone().withMessage('Valid phone number is required')
], async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Check if provider profile already exists
    const existingProvider = await Provider.findOne({ user: req.user._id });
    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: 'Provider profile already exists'
      });
    }

    const providerData = {
      ...req.body,
      user: req.user._id
    };

    const provider = new Provider(providerData);
    await provider.save();

    await provider.populate('user', 'firstName lastName email avatar');

    res.status(201).json({
      success: true,
      message: 'Provider profile created successfully',
      data: { provider }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create provider profile',
      error: error.message
    });
  }
});

// Update provider profile
router.put('/profile', verifyToken, [
  body('businessName').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().isLength({ max: 1000 }),
  body('specializations').optional().isArray({ min: 1 }),
  body('contact.phone').optional().isMobilePhone()
], async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider profile not found'
      });
    }

    const allowedUpdates = [
      'businessName', 'businessType', 'description', 'specializations',
      'location', 'contact', 'businessHours', 'images', 'settings'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    Object.assign(provider, updates);
    await provider.save();

    await provider.populate('user', 'firstName lastName email avatar');

    res.json({
      success: true,
      message: 'Provider profile updated successfully',
      data: { provider }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update provider profile',
      error: error.message
    });
  }
});

// Get own provider profile
router.get('/profile/me', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const provider = await Provider.findOne({ user: req.user._id })
      .populate('user', 'firstName lastName email avatar');

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider profile not found'
      });
    }

    res.json({
      success: true,
      data: { provider }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get provider profile',
      error: error.message
    });
  }
});

// Get provider dashboard stats
router.get('/dashboard/stats', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider profile not found'
      });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get various statistics
    const [
      totalBookings,
      monthlyBookings,
      todayBookings,
      pendingBookings,
      totalServices,
      completedBookings,
      monthlyRevenue
    ] = await Promise.all([
      Booking.countDocuments({ provider: provider._id }),
      Booking.countDocuments({
        provider: provider._id,
        createdAt: { $gte: startOfMonth }
      }),
      Booking.countDocuments({
        provider: provider._id,
        'appointment.date': { $gte: startOfDay }
      }),
      Booking.countDocuments({
        provider: provider._id,
        status: 'pending'
      }),
      Service.countDocuments({ provider: provider._id, isActive: true }),
      Booking.countDocuments({
        provider: provider._id,
        status: 'completed'
      }),
      Booking.aggregate([
        {
          $match: {
            provider: provider._id,
            status: 'completed',
            createdAt: { $gte: startOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$pricing.total' }
          }
        }
      ])
    ]);

    // Get upcoming bookings
    const upcomingBookings = await Booking.find({
      provider: provider._id,
      'appointment.date': { $gte: startOfDay },
      status: { $in: ['pending', 'confirmed'] }
    })
      .populate('customer', 'firstName lastName phone')
      .populate('service', 'name duration')
      .sort({ 'appointment.date': 1, 'appointment.startTime': 1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalBookings,
          monthlyBookings,
          todayBookings,
          pendingBookings,
          totalServices,
          completedBookings,
          monthlyRevenue: monthlyRevenue[0]?.total || 0,
          rating: provider.rating
        },
        upcomingBookings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard stats',
      error: error.message
    });
  }
});

// Update business hours
router.put('/business-hours', verifyToken, [
  body('businessHours').isArray().withMessage('Business hours must be an array'),
  body('businessHours.*.day').isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  body('businessHours.*.isOpen').isBoolean(),
  body('businessHours.*.openTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('businessHours.*.closeTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
], async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider profile not found'
      });
    }

    provider.businessHours = req.body.businessHours;
    await provider.save();

    res.json({
      success: true,
      message: 'Business hours updated successfully',
      data: { businessHours: provider.businessHours }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update business hours',
      error: error.message
    });
  }
});

// Search providers by location
router.get('/search/location', async (req, res) => {
  try {
    const { lat, lng, radius = 10, limit = 20 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const providers = await Provider.find({
      isActive: true,
      'location.coordinates': {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseInt(radius) / 6371 // Convert km to radians
          ]
        }
      }
    })
      .populate('user', 'firstName lastName avatar')
      .select('-contact.email -settings -verification.license -verification.certifications')
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: { providers }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search providers by location',
      error: error.message
    });
  }
});

// Get provider business types
router.get('/meta/business-types', async (req, res) => {
  try {
    const businessTypes = [
      { value: 'salon', label: 'Salon' },
      { value: 'spa', label: 'Spa' },
      { value: 'individual', label: 'Individual Provider' },
      { value: 'mobile', label: 'Mobile Service' },
      { value: 'home-studio', label: 'Home Studio' }
    ];

    res.json({
      success: true,
      data: { businessTypes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get business types',
      error: error.message
    });
  }
});

module.exports = router;