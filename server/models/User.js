const bcrypt = require('bcryptjs');

// If running with in-memory DB explicitly enabled, export a lightweight in-memory implementation
const useInMemory = (process.env.USE_IN_MEMORY_DB === 'true') || (global && global.USE_IN_MEMORY_DB === true) || (process.env.NODE_ENV === 'test');

if (!useInMemory) {
  // Try to use mongoose model when available
  try {
    const mongoose = require('mongoose');
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, unique: true, sparse: true },
      password: { type: String },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      googleId: { type: String },
      isVerified: { type: Boolean, default: false },
      otpCodeHash: { type: String },
      otpExpiresAt: { type: Date },
      phone: { type: String, unique: true, sparse: true },
      isPhoneVerified: { type: Boolean, default: false },
      phoneOtpHash: { type: String },
      phoneOtpExpiresAt: { type: Date },
      createdAt: { type: Date, default: Date.now }
    });

    // Hash password before saving
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password') || !this.password) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });

    // Method to check password validity
    userSchema.methods.comparePassword = async function(candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password);
    };

    module.exports = mongoose.model('User', userSchema);
  } catch (err) {
    console.warn('Mongoose not available, falling back to in-memory User store');
  }
}

// In-memory fallback implementation (development only)
const users = [];

function matchQuery(user, query) {
  // Support simple queries used in routes: { email }, { phone } or $or
  if (query.email && user.email === query.email) return true;
  if (query.phone && user.phone === query.phone) return true;
  if (query.googleId && user.googleId === query.googleId) return true;
  if (query.$or && Array.isArray(query.$or)) {
    return query.$or.some(q => matchQuery(user, q));
  }
  return false;
}

class InMemoryUser {
  constructor(data = {}) {
    this._id = (data._id) ? data._id : (Math.random().toString(36).slice(2));
    this.name = data.name || 'User';
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'user';
    this.googleId = data.googleId;
    this.isVerified = data.isVerified || false;
    this.otpCodeHash = data.otpCodeHash;
    this.otpExpiresAt = data.otpExpiresAt;
    this.phone = data.phone;
    this.isPhoneVerified = data.isPhoneVerified || false;
    this.phoneOtpHash = data.phoneOtpHash;
    this.phoneOtpExpiresAt = data.phoneOtpExpiresAt;
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    // hash password if present and not already hashed (simple heuristic)
    if (this.password && this.password.length < 60) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    const idx = users.findIndex(u => u._id === this._id || (this.email && u.email === this.email) || (this.phone && u.phone === this.phone));
    if (idx === -1) users.push(this);
    else users[idx] = this;
    return this;
  }

  async comparePassword(candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
  }

  static async findOne(query) {
    const found = users.find(u => matchQuery(u, query));
    if (!found) return null;
    // return plain object that behaves like mongoose doc
    return Object.assign(new InMemoryUser(found), found);
  }
}

module.exports = InMemoryUser;