const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  appointment: {
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true // Format: "14:30"
    },
    endTime: {
      type: String,
      required: true // Format: "15:30"
    },
    duration: {
      type: Number,
      required: true // in minutes
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  pricing: {
    servicePrice: { type: Number, required: true },
    additionalFees: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'online', 'bank-transfer'],
      default: 'online'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partially-refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    depositPaid: { type: Boolean, default: false },
    depositAmount: { type: Number, default: 0 }
  },
  notes: {
    customerNotes: String,
    providerNotes: String,
    internalNotes: String
  },
  cancellation: {
    isCancelled: { type: Boolean, default: false },
    cancelledBy: {
      type: String,
      enum: ['customer', 'provider', 'admin']
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: { type: Number, default: 0 },
    refundStatus: {
      type: String,
      enum: ['none', 'processing', 'completed', 'failed']
    }
  },
  confirmation: {
    isConfirmed: { type: Boolean, default: false },
    confirmedAt: Date,
    confirmationMethod: {
      type: String,
      enum: ['automatic', 'manual', 'payment']
    }
  },
  reminders: {
    sent: { type: Boolean, default: false },
    sentAt: Date,
    method: {
      type: String,
      enum: ['email', 'sms', 'push']
    }
  },
  review: {
    hasReviewed: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    reviewedAt: Date
  },
  metadata: {
    bookedVia: {
      type: String,
      enum: ['web', 'mobile', 'phone', 'walk-in'],
      default: 'web'
    },
    ipAddress: String,
    userAgent: String
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
bookingSchema.index({ customer: 1, 'appointment.date': -1 });
bookingSchema.index({ provider: 1, 'appointment.date': 1 });
bookingSchema.index({ service: 1, status: 1 });
bookingSchema.index({ 'appointment.date': 1, status: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

// Compound index for avoiding double bookings
bookingSchema.index({ 
  provider: 1, 
  'appointment.date': 1, 
  'appointment.startTime': 1,
  status: 1 
});

// Virtual for full appointment datetime
bookingSchema.virtual('appointmentDateTime').get(function() {
  if (this.appointment.date && this.appointment.startTime) {
    const [hours, minutes] = this.appointment.startTime.split(':');
    const datetime = new Date(this.appointment.date);
    datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return datetime;
  }
  return null;
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  if (this.status === 'cancelled' || this.status === 'completed') {
    return false;
  }
  
  const now = new Date();
  const appointmentTime = this.appointmentDateTime;
  
  if (!appointmentTime) return false;
  
  // Allow cancellation up to 24 hours before appointment
  const hoursUntilAppointment = (appointmentTime - now) / (1000 * 60 * 60);
  return hoursUntilAppointment >= 24;
};

// Ensure virtual fields are serialized
bookingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);