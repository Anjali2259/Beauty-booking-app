const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('./auth');
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const router = express.Router();

// Get all services with filtering and search
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      search,
      location,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const services = await Service.find(query)
      .populate('provider', 'businessName location.address businessType rating')
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOptions);

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: {
        services,
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
      message: 'Failed to get services',
      error: error.message
    });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'businessName location businessType contact rating images verification');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get service',
      error: error.message
    });
  }
});

// Create new service (provider only)
router.post('/', verifyToken, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Service name must be 2-100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be 10-500 characters'),
  body('category').isIn([
    'hair-styling', 'hair-coloring', 'nail-care', 'skincare', 'makeup',
    'eyebrow-lash', 'massage', 'waxing', 'other'
  ]).withMessage('Invalid category'),
  body('duration').isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15-480 minutes'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
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

    // Find provider profile
    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'Provider profile not found. Please complete your provider profile first.'
      });
    }

    const serviceData = {
      ...req.body,
      provider: provider._id
    };

    const service = new Service(serviceData);
    await service.save();

    await service.populate('provider', 'businessName location businessType');

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
});

// Update service (provider only - own services)
router.put('/:id', verifyToken, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 500 }),
  body('duration').optional().isInt({ min: 15, max: 480 }),
  body('price').optional().isFloat({ min: 0 })
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

    // Find provider profile
    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'Provider profile not found.'
      });
    }

    const service = await Service.findOne({
      _id: req.params.id,
      provider: provider._id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or access denied'
      });
    }

    const allowedUpdates = ['name', 'description', 'category', 'duration', 'price', 'images', 'requirements', 'tags', 'bookingSettings', 'isActive'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    Object.assign(service, updates);
    await service.save();

    await service.populate('provider', 'businessName location businessType');

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
});

// Delete service (provider only - own services)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    // Find provider profile
    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'Provider profile not found.'
      });
    }

    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      provider: provider._id
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or access denied'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message
    });
  }
});

// Get services by provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const services = await Service.find({
      provider: req.params.providerId,
      isActive: true
    })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Service.countDocuments({
      provider: req.params.providerId,
      isActive: true
    });

    res.json({
      success: true,
      data: {
        services,
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
      message: 'Failed to get provider services',
      error: error.message
    });
  }
});

// Get service categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = [
      { value: 'hair-styling', label: 'Hair Styling' },
      { value: 'hair-coloring', label: 'Hair Coloring' },
      { value: 'nail-care', label: 'Nail Care' },
      { value: 'skincare', label: 'Skincare' },
      { value: 'makeup', label: 'Makeup' },
      { value: 'eyebrow-lash', label: 'Eyebrow & Lash' },
      { value: 'massage', label: 'Massage' },
      { value: 'waxing', label: 'Waxing' },
      { value: 'other', label: 'Other' }
    ];

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get categories',
      error: error.message
    });
  }
});

module.exports = router;