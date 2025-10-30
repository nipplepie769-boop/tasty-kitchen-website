require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// We'll require routes after attempting DB connection so models can choose an in-memory
// fallback when Mongo is unavailable in development.
let authRoutes;
let productRoutes;
let cartRoutes;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tasty_kitchen', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    console.warn('Falling back to in-memory development database. Set MONGODB_URI or start MongoDB for persistent storage.');
    // mark that we are running without Mongo so models can fallback
    global.USE_IN_MEMORY_DB = true;
    return false;
  }
}
// In development, skip attempting to connect to MongoDB and use the in-memory fallback so
// the server starts instantly. In production we attempt to connect to MongoDB.
if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV!=production — using in-memory DB and skipping MongoDB connection for fast startup');
  global.USE_IN_MEMORY_DB = true;

  // require routes immediately
  authRoutes = require('./routes/auth');
  try { productRoutes = require('./routes/products'); } catch (e) { productRoutes = (req,res)=>res.status(404).end(); }
  try { cartRoutes = require('./routes/cart'); } catch (e) { cartRoutes = (req,res)=>res.status(404).end(); }

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (in-memory DB)`);
  });

} else {
  // Production: attempt DB connection before registering routes
  connectDB().then(() => {
    // require routes after DB attempt
    authRoutes = require('./routes/auth');
    try { productRoutes = require('./routes/products'); } catch (e) { productRoutes = (req,res)=>res.status(404).end(); }
    try { cartRoutes = require('./routes/cart'); } catch (e) { cartRoutes = (req,res)=>res.status(404).end(); }

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
