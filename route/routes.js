
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const friendshipController = require('../controller/friendshipController');
const groupController = require('../controller/groupController');
const postController = require('../controller/postController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/send-friend-request', verifyToken, friendshipController.sendFriendRequest);
router.get('/friend-requests', verifyToken, friendshipController.getFriendRequests);
router.post('/accept-friend-request', verifyToken, friendshipController.acceptFriendRequest);
router.post('/reject-friend-request', verifyToken, friendshipController.rejectFriendRequest);
router.get('/friends', verifyToken, friendshipController.getUserFriends);

router.post('/create-group', verifyToken, groupController.createGroup);
router.post('/add-members-to-group', verifyToken, groupController.addMembersToGroup);
router.post('/invite-members-to-group', verifyToken, groupController.inviteMembersToGroup);

router.post('/create-post', verifyToken, postController.createPost);
router.post('/edit-post', verifyToken, postController.editPost);
router.post('/delete-post', verifyToken, postController.deletePost);
router.post('/get-post', verifyToken, postController.getPostsInGroup);
module.exports = router;
