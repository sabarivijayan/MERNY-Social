const express = require('express');
const router = express.Router();
const { createPost, deletePost, getPosts, likePost, unLikePost } = require('../controllers/postController');
const { signup, login, logout } = require('../controllers/authController');
const { searchUser, getUserById, updateUser, follow, unfollowUser, getUserSuggestions } = require('../controllers/userController');
const{isAuthenticated} = require('../middleware/authMiddleware');
const { addComment, updateComment,  likeComment, unLikeComment, deleteComment } = require('../controllers/commentsController');
const { createNotification, deleteNotification } = require('../controllers/notificationController');


router.get("/protected", isAuthenticated, (req, res) => {
    console.log("hello");
    res.send("Hello, user!");
  });
//routes for post

router.route("/post").post(isAuthenticated, createPost);
router.route("/posts").get(isAuthenticated, getPosts);
router.route("/posts/:id/like").patch(isAuthenticated, likePost);
router.route("/posts/:id/unlike").patch(isAuthenticated, unLikePost);
router.route("/posts/:id").delete(isAuthenticated, deletePost);

//routes for authentication
router.route('/register').post(signup);

router.route('/login').post(login)

router.route('/logout').post(logout)

// routes for user conroller
router.route('/search').get(isAuthenticated ,searchUser);

router.route('/user/:id').get(isAuthenticated,getUserById);

router.route('/user').patch(isAuthenticated,updateUser);

router.route('/user/:id/follow').patch(isAuthenticated,follow);

router.route('/user/:id/unfollow').patch(isAuthenticated,unfollowUser);

router.route('/userSuggestion').get(isAuthenticated,getUserSuggestions);

//routes for comment controller
router.route('/comment').post(isAuthenticated,addComment);

router.route('/comment/:id').post(isAuthenticated,updateComment);

router.route('/comment/:id/like').post(isAuthenticated,likeComment);

router.route('/comment/:id/unlike').post(isAuthenticated,unLikeComment);

router.route('/comment/:id').delete(isAuthenticated,deleteComment);

// routes for notification 

router.route('/notification').post(isAuthenticated,createNotification);

router.route('/notification/:id').delete(isAuthenticated,deleteNotification);

module.exports = router;    

