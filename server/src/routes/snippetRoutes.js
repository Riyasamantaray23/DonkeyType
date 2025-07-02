// server/src/routes/snippetRoutes.js

const express = require('express');
const router = express.Router();
const CodeSnippet = require('../models/codesnippet'); // Import the CodeSnippet model

// @route   GET /api/snippets
// @desc    Get all code snippets
// @access  Public (for now)
router.get('/', async (req, res) => {
  try {
    const snippets = await CodeSnippet.find({}); // Find all snippets
    res.json(snippets); // Send them as JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// You will add more routes here later (e.g., POST for creating, GET for single snippet, etc.)

module.exports = router;