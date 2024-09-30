const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/postController'); // Import deletePost
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a post
router.post('/', verifyToken, createPost);

// Get all posts
router.get('/', getPosts);

// Delete a post by ID
router.delete('/:id', verifyToken, deletePost); // Add this line for deleting a post

module.exports = router;
