const express = require('express');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const { verifyToken } = require('./auth');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Provider = require('../models/Provider');
const router = express.Router();

// Create new booking
router.post('/', verifyToken, [
  body('serviceId').isMongoId().withMessage('Valid service ID is required'),
  body('providerId').isMongoId().withMessage('Valid provider ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time is required (HH:MM)'),
  body('customerNotes').optional().isLength({ max: 500 }).withMessage('Customer notes must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { serviceId, providerId, date, startTime, customerNotes = '' } = req.body;

    // Verify service exists and belongs to provider
    const service = await Service.findOne({
      _id: serviceId,
      provider: providerId,
      isActive: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or not available'
      });
    }

    // Verify provider exists and is active
    const provider = await Provider.findOne({
      _id: providerId,
      isActive: true
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found or not available'
      });
    }

    // Calculate end time
    const startDateTime = moment(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
    const endDateTime = startDateTime.clone().add(service.duration, 'minutes');
    const endTime = endDateTime.format('HH:mm');

    // Check if appointment is in the future
    if (startDateTime.isBefore(moment())) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book appointments in the past'
      });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      provider: providerId,
      'appointment.date': new Date(date),
      status: { $in: ['pending', 'confirmed', 'in-progress'] },
      $or: [
        {
          $and: [
            { 'appointment.startTime': { $lte: startTime } },
            { 'appointment.endTime': { $gt: startTime } }
          ]
        },
        {
          $and: [
            { 'appointment.startTime': { $lt: endTime } },
            { 'appointment.endTime': { $gte: endTime } }
          ]
        },
        {
          $and: [
            { 'appointment.startTime': { $gte: startTime } },
            { 'appointment.endTime': { $lte: endTime } }
          ]
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(409).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    // Create booking
    const booking = new Booking({
      customer: req.user._id,
      provider: providerId,
      service: serviceId,
      appointment: {
        date: new Date(date),
        startTime,
        endTime,
        duration: service.duration
      },
      pricing: {
        servicePrice: service.price,
        total: service.price,
        currency: service.currency
      },
      notes: {
        customerNotes
      },
      metadata: {
        bookedVia: 'web',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    await booking.save();

    // Populate booking data
    await booking.populate([
      { path: 'customer', select: 'firstName lastName email phone' },
      { path: 'provider', select: 'businessName contact location' },
      { path: 'service', select: 'name duration price category' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// Get user's bookings
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, upcoming } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = { customer: req.user._id };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter upcoming bookings
    if (upcoming === 'true') {
      query['appointment.date'] = { $gte: new Date() };
      query.status = { $in: ['pending', 'confirmed'] };
    }

    const bookings = await Booking.find(query)
      .populate('provider', 'businessName contact location')
      .populate('service', 'name duration price category')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'appointment.date': 1, 'appointment.startTime': 1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
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
      message: 'Failed to get bookings',
      error: error.message
    });
  }
});

// Get provider's bookings
router.get('/provider-bookings', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Provider role required.'
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'Provider profile not found.'
      });
    }

    const { page = 1, limit = 10, status, date } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = { provider: provider._id };

    if (status) {
      query.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query['appointment.date'] = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'firstName lastName email phone')
      .populate('service', 'name duration price category')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'appointment.date': 1, 'appointment.startTime': 1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
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
      message: 'Failed to get provider bookings',
      error: error.message
    });
  }
});

// Get booking by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone')
      .populate('provider', 'businessName contact location')
      .populate('service', 'name duration price category description');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has access to this booking
    const hasAccess = booking.customer._id.toString() === req.user._id.toString() ||
                     (req.user.role === 'provider' && 
                      await Provider.findOne({ user: req.user._id, _id: booking.provider._id }));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get booking',
      error: error.message
    });
  }
});

// Update booking status (provider only)
router.put('/:id/status', verifyToken, [
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status'),
  body('providerNotes').optional().isLength({ max: 500 })
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
      return res.status(400).json({
        success: false,
        message: 'Provider profile not found.'
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: provider._id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const { status, providerNotes } = req.body;

    booking.status = status;
    if (providerNotes) {
      booking.notes.providerNotes = providerNotes;
    }

    if (status === 'confirmed') {
      booking.confirmation.isConfirmed = true;
      booking.confirmation.confirmedAt = new Date();
      booking.confirmation.confirmationMethod = 'manual';
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
});

// Cancel booking
router.put('/:id/cancel', verifyToken, [
  body('reason').optional().isLength({ max: 500 }).withMessage('Reason must be less than 500 characters')
], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user has permission to cancel
    const isCustomer = booking.customer.toString() === req.user._id.toString();
    const isProvider = req.user.role === 'provider' && 
                      await Provider.findOne({ user: req.user._id, _id: booking.provider });

    if (!isCustomer && !isProvider) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if booking can be cancelled
    if (!booking.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled. Please check cancellation policy.'
      });
    }

    const { reason } = req.body;

    booking.status = 'cancelled';
    booking.cancellation = {
      isCancelled: true,
      cancelledBy: isCustomer ? 'customer' : 'provider',
      cancelledAt: new Date(),
      reason: reason || 'No reason provided',
      refundStatus: 'none'
    };

    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// Get available time slots for a service
router.get('/availability/:providerId/:serviceId', async (req, res) => {
  try {
    const { providerId, serviceId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    const service = await Service.findOne({
      _id: serviceId,
      provider: providerId,
      isActive: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }

    // Get existing bookings for the date
    const existingBookings = await Booking.find({
      provider: providerId,
      'appointment.date': new Date(date),
      status: { $in: ['pending', 'confirmed', 'in-progress'] }
    });

    // Generate time slots (simplified version)
    const startHour = 9; // 9 AM
    const endHour = 18; // 6 PM
    const slotDuration = 30; // 30 minutes
    const availableSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const slotEndTime = moment(`${date} ${slotTime}`).add(service.duration, 'minutes').format('HH:mm');

        // Check if slot conflicts with existing bookings
        const hasConflict = existingBookings.some(booking => {
          const bookingStart = booking.appointment.startTime;
          const bookingEnd = booking.appointment.endTime;
          
          return (slotTime >= bookingStart && slotTime < bookingEnd) ||
                 (slotEndTime > bookingStart && slotEndTime <= bookingEnd) ||
                 (slotTime <= bookingStart && slotEndTime >= bookingEnd);
        });

        if (!hasConflict) {
          availableSlots.push({
            startTime: slotTime,
            endTime: slotEndTime,
            duration: service.duration
          });
        }
      }
    }

    res.json({
      success: true,
      data: {
        date,
        availableSlots,
        service: {
          id: service._id,
          name: service.name,
          duration: service.duration,
          price: service.price
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get availability',
      error: error.message
    });
  }
});

module.exports = router;