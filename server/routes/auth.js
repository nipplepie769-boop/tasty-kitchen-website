const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Optional deps (make sure to install): google-auth-library, nodemailer
let OAuth2Client;
try {
  OAuth2Client = require('google-auth-library').OAuth2Client;
} catch (_) {}
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (_) {}

function signToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

async function sendOtpEmail(to, code) {
  const { getEmailTransporter } = require('../config/emailConfig');
  const transporter = await getEmailTransporter();
  
  const info = await transporter.sendMail({
  from: process.env.SMTP_FROM || '"The Tasty Kitchen" <no-reply@tastykitchen.local>',
    to,
    subject: 'Your verification code',
    text: `Your verification code is ${code}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Verify your email</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
          ${code}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `,
  });

  // For development, log the preview URL
  let previewUrl = null;
  try {
    previewUrl = nodemailer.getTestMessageUrl(info);
  } catch (e) {
    // ignore if not available
  }
  if (info.messageId && process.env.NODE_ENV !== 'production') {
    console.log('Email preview URL:', previewUrl || nodemailer.getTestMessageUrl(info));
  }

  return { info, previewUrl };
}

// Register new user
router.post('/register',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user (unverified until OTP step)
      user = new User({ name, email, password, isVerified: false });
      await user.save();

      res.status(201).json({ message: 'Registered. Please verify your email.' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});

// Login user
router.post('/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Require verified account
      if (!user.isVerified) {
        return res.status(403).json({ error: 'Account not verified' });
      }

      // Validate password (if user has password)
      if (!user.password) {
        return res.status(400).json({ error: 'Password not set for this account' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = signToken(user);

      res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});

// Request OTP for email verification (creates user if not exists)
router.post('/request-otp', [body('email').isEmail()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      // Create a placeholder user to verify
      const defaultName = email.split('@')[0];
      user = new User({ email, name: defaultName, isVerified: false });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = await bcrypt.hash(code, 10);
    user.otpCodeHash = codeHash;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const info = await sendOtpEmail(email, code);
    // In development return the code for easy testing (don't do this in production)
    const responsePayload = { message: 'OTP sent' };
    if (process.env.NODE_ENV !== 'production') {
      responsePayload.code = code;
      // nodemailer test URL may be returned by sendOtpEmail; if available attach
      if (info && info.previewUrl) responsePayload.previewUrl = info.previewUrl;
    }
    res.json(responsePayload);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify OTP and optionally set password
router.post('/verify-otp', [
  body('email').isEmail(),
  body('otp').isLength({ min: 6, max: 6 }),
  body('password').optional().isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.otpCodeHash || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP expired or not requested' });
    }
    const ok = await bcrypt.compare(otp, user.otpCodeHash);
    if (!ok) return res.status(400).json({ error: 'Invalid OTP' });

    user.isVerified = true;
    user.otpCodeHash = undefined;
    user.otpExpiresAt = undefined;
    if (password) {
      user.password = password; // will be hashed in pre-save
    }
    await user.save();

    const token = signToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Request OTP for phone verification (creates user if not exists)
router.post('/request-otp-phone', [body('phone').isString().isLength({ min: 6 })], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { phone } = req.body;
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, name: 'User', isPhoneVerified: false });
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = await bcrypt.hash(code, 10);
    user.phoneOtpHash = codeHash;
    user.phoneOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    // For SMS, integrate a provider (e.g., Twilio). For now, respond without sending.
    const responsePayload = { message: 'OTP sent to phone' };
    if (process.env.NODE_ENV !== 'production') {
      responsePayload.code = code;
    }
    res.json(responsePayload);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify phone OTP
router.post('/verify-otp-phone', [
  body('phone').isString().isLength({ min: 6 }),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.phoneOtpHash || !user.phoneOtpExpiresAt || user.phoneOtpExpiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP expired or not requested' });
    }
    const ok = await bcrypt.compare(otp, user.phoneOtpHash);
    if (!ok) return res.status(400).json({ error: 'Invalid OTP' });

    user.isPhoneVerified = true;
    user.phoneOtpHash = undefined;
    user.phoneOtpExpiresAt = undefined;
    await user.save();

    const token = signToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Google sign-in using ID token (Google Identity Services)
router.post('/google', [body('idToken').notEmpty()], async (req, res) => {
  try {
    if (!OAuth2Client) return res.status(500).json({ error: 'Google auth not configured' });
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken: req.body.idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ error: 'Invalid Google token' });

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = new User({ name, email, googleId, isVerified: true });
      await user.save();
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      user.isVerified = true;
    }

    const token = signToken(user);
      res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;