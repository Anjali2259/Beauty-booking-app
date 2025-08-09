const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: [
      'hair-styling',
      'hair-coloring',
      'nail-care',
      'skincare',
      'makeup',
      'eyebrow-lash',
      'massage',
      'waxing',
      'other'
    ]
  },
  duration: {
    type: Number,
    required: true, // in minutes
    min: 15,
    max: 480 // 8 hours max
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  images: [{
    type: String // URLs to service images
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  requirements: {
    type: String,
    maxlength: 200
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  bookingSettings: {
    advanceBookingDays: { type: Number, default: 30 },
    cancellationPolicy: { type: String, default: '24 hours' },
    requiresDeposit: { type: Boolean, default: false },
    depositAmount: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for search and filtering
serviceSchema.index({ name: 'text', description: 'text', tags: 'text' });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ provider: 1, isActive: 1 });
serviceSchema.index({ price: 1 });

module.exports = mongoose.model('Service', serviceSchema);