const Group = require('../model/groupModel');
const Post = require('../model/postModel');
const User = require('../model/userModel');
// Create Post within Group
exports.createPost = async (req, res) => {
  try {
    const { groupId, content } = req.body;

    // Check if the user is a member of the group
    const group = await Group.findOne({ _id: groupId, members: req.userId });
    if (!group) {
      return res.status(403).json({ error: 'You are not authorized to create a post in this group' });
    }

    // Create the post
    const post = await Post.create({ content, author: req.userId, group: groupId });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Post within Group
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const { content } = req.body;

    // Find the post and check if the user is the author
    const post = await Post.findOne({ _id: postId, author: req.userId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or you are not the author' });
    }

    // Update the post content
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post within Group
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    // Find the post and check if the user is the author
    const post = await Post.findOne({ _id: postId, author: req.userId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or you are not the author' });
    }

    // Delete the post
    await post.deleteOne({ _id: postId });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Posts within Group
exports.getPostsInGroup = async (req, res) => {
  try {
    const { groupId } = req.body;

    // Check if the user is a member of the group
    const group = await Group.findOne({ _id: groupId, members: req.userId });
    if (!group) {
      return res.status(403).json({ error: 'You are not authorized to view posts in this group' });
    }

    // Get all posts in the group
    const posts = await Post.find({ group: groupId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
