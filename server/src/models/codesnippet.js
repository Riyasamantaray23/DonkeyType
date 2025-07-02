const mongoose = require('mongoose');

const CodeSnippetSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false, // Description is optional
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'], // Enforce specific values
        required: true,
    },
    // Add more fields if needed, like 'creator' or 'createdAt'
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const CodeSnippet = mongoose.model('CodeSnippet', CodeSnippetSchema);

module.exports = CodeSnippet;