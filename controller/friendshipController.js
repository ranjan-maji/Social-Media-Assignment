const Friendship = require('../model/friendshipModel');
const User = require('../model/userModel');

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { toUserId } = req.body;

    // Check if the receiver user exists
    const receiverUser = await User.findById(toUserId);
    if (!receiverUser) {
      return res.status(404).json({ error: 'Receiver user not found' });
    }

    // Check if the sender is not sending friend request to themselves
    // if (toUserId.equals(req.userId)) {
    //   return res.status(400).json({ error: 'You cannot send friend request to yourself' });
    // }

    // Check if the friend request already exists
    const existingRequest = await Friendship.findOne({ fromUser: req.userId, toUser: toUserId });
    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    // Create and save the friend request
    const friendship = await Friendship.create({ fromUser: req.userId, toUser: toUserId });
    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Friend Requests
exports.getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await Friendship.find({ toUser: req.userId, status: 'pending' }).populate('fromUser');
    console.log(friendRequests)
    res.json(friendRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Check if the friend request exists
    const request = await Friendship.findOne({ _id: requestId, toUser: req.userId, status: 'pending' });
    if (!request) {
      return res.status(404).json({ error: 'Friend request not found or already processed' });
    }

    // Update the friend request status to accepted
    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Friend Request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Check if the friend request exists
    const request = await Friendship.findOne({ _id: requestId, toUser: req.userId, status: 'pending' });
    if (!request) {
      return res.status(404).json({ error: 'Friend request not found or already processed' });
    }

    // Update the friend request status to rejected
    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Friend request rejected successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User's Friends
exports.getUserFriends = async (req, res) => {
  try {
    const friends = await Friendship.find({ $or: [{ fromUser: req.userId }, { toUser: req.userId }], status: 'accepted' })
      .populate('fromUser')
      .populate('toUser');
    const userFriends = friends.map(friendship => {
      return {
        friend: friendship.fromUser._id.equals(req.userId) ? friendship.toUser : friendship.fromUser,
        status: friendship.status
      };
    });
    res.json(userFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

