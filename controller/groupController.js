// controllers/groupController.js
const Group = require('../model/groupModel');
const Post = require('../model/postModel');
const User = require('../model/userModel');



// Create Group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    // Ensure that the current user is included in the group members
    if (!members.includes(req.userId)) {
      members.push(req.userId);
    }

    // Create the group
    const group = await Group.create({ name, members, owner : req.userId });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Members to Group
exports.addMembersToGroup = async (req, res) => {
  try {
    const { groupId, members } = req.body;

    // Check if the current user is the owner of the group
    const group = await Group.findOne({ _id: groupId, owner: req.userId });
    if (!group) {
      return res.status(403).json({ error: 'You are not authorized to add members to this group' });
    }

    // Update the group with new members
    await Group.findByIdAndUpdate(groupId, { $addToSet: { members: { $each: members } } });
    res.json({ message: 'Members added to the group successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Invite Members to Group
exports.inviteMembersToGroup = async (req, res) => {
  try {
    const { groupId, emails } = req.body;

    // Check if the current user is the owner of the group
    const group = await Group.findOne({ _id: groupId, owner: req.userId });
    if (!group) {
      return res.status(403).json({ error: 'You are not authorized to invite members to this group' });
    }

    // Find user(s) by email and add them to the group members
    for (const email of emails) {
      const user = await User.findOne({ email });
      if (user) {
        await Group.findByIdAndUpdate(groupId, { $addToSet: { members: user._id } });
      }
    }

    res.json({ message: 'Members invited to the group successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



