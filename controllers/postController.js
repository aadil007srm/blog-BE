const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  // Log the user ID for debugging
  console.log('User ID:', req.user ? req.user.id : 'No user found');

  // Check if user ID is available
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
    user: req.user.id,
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting post' });
  }
};
