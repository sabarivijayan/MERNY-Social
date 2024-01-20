const User = require("../models/User");

// search the user
exports.searchUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({
        message: "Invalid Authentication",
      });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get user by Id

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(req.params.id);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Invalid Authentication",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update the user

exports.updateUser = async (req, res) => {
  try {
    const { fullname, avatar, mobile, address, story, website, gender } =
      req.body;
    const userId = req._id; //   user ID is stored in req._id

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, {
      fullname,
      avatar,
      mobile,
      address,
      story,
      website,
      gender,
    });

    if (!updatedUser) {
      return res.status(404).json({ msg: "Invalid Authentication" });
    }

    res.status(200).json({ msg: "Update Success!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// follow a user on the basis of userid
exports.follow = async (req, res) => {
  try {
    const userId = req.params.id;

    const followerId = req._id; // Assuming the authenticated user ID is stored in req._id

    //  if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ msg: "user not found" });
    }

    // if the user is already being followed
    if (user.followers.includes(followerId)) {
      return res.status(400).json({ msg: "You followed this user." });
    }

    // Update the user and the follower
    user.followers.push(followerId);
    await user.save();

    const follower = await User.findByIdAndUpdate(
      followerId,
       {$push: { following: userId },}
       );

    res.status(200).json({ newUser: follower });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const followerId = req._id; // Assuming the authenticated user ID is stored in req._id

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ msg: "User not found." });
    }

    // Update the user and the follower
    user.followers = user.followers.filter(
      (follower) => follower.toString()!== followerId
    );
    await user.save();

    const follower = await User.findByIdAndUpdate(followerId, {
      $pull: { following: userId },
    });

    res.status(200).json({ newUser: follower });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// suggest users 

exports.getUserSuggestions = async (req, res) => {
  try {
    const userId = req._id; // Assuming the authenticated user ID is stored in req._id

    // Get the logged-in user
    const user = await User.findById(userId);

    // Get the IDs of all the users the logged-in user follows (including the logged-in user's own ID)
    const followingIds = [userId, ...user.following];

    // Find all the users whose ID is in the followingIds
    const suggestions = await User.find({ _id: { $in: followingIds } });

    res.status(200).json({ users: suggestions, result: suggestions.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
