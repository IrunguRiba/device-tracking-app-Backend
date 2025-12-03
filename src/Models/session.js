const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    visitorId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    expiresAt: { 
      type: Date, 
      required: true
    },
  },
  { 
    timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  } 
);

sessionSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    this.expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;  
  }
  next();
});
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
