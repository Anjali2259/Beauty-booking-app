const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  businessType: {
    type: String,
    required: true,
    enum: ['salon', 'spa', 'individual', 'mobile', 'home-studio']
  },
  description: {
    type: String,
    maxlength: 1000
  },
  specializations: [{
    type: String,
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
  }],
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
    },
    serviceRadius: { type: Number, default: 0 } // in kilometers for mobile services
  },
  contact: {
    phone: String,
    email: String,
    website: String,
    socialMedia: {
      instagram: String,
      facebook: String,
      twitter: String
    }
  },
  businessHours: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    isOpen: { type: Boolean, default: true },
    openTime: String, // Format: "09:00"
    closeTime: String, // Format: "18:00"
    breaks: [{
      startTime: String,
      endTime: String,
      description: String
    }]
  }],
  images: {
    logo: String,
    gallery: [String], // URLs to business images
    portfolio: [String] // URLs to work samples
  },
  verification: {
    isVerified: { type: Boolean, default: false },
    license: String,
    certifications: [String],
    verifiedAt: Date
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  settings: {
    autoAcceptBookings: { type: Boolean, default: false },
    requireDeposit: { type: Boolean, default: false },
    cancellationPolicy: { type: String, default: '24 hours notice required' },
    bookingBuffer: { type: Number, default: 0 }, // minutes between appointments
    maxAdvanceBooking: { type: Number, default: 30 } // days
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Geospatial index for location-based searches
providerSchema.index({ 'location.coordinates': '2dsphere' });
providerSchema.index({ businessType: 1, isActive: 1 });
providerSchema.index({ specializations: 1, isActive: 1 });
providerSchema.index({ 'rating.average': -1 });

module.exports = mongoose.model('Provider', providerSchema);