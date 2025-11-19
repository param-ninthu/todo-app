const express = require('express');
const todoRoutes = require('./todoRoutes');

const router = express.Router();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});


router.use('/todos', todoRoutes);

module.exports = router;