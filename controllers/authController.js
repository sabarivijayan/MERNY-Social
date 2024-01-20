const { JWT_SECRET } = require("../config/authConfig");
const User = require("../models/User");
const jwt = require("jsonwebtoken");



const generateAccessToken = (user_id) => {
  const accessToken = jwt.sign({ _id: user_id }, JWT_SECRET, { expiresIn: '1d' });
  return accessToken;}
  
exports.signup = async (req, res) => {
  try {
    const { fullname, username, email, password,gender} = req.body;

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {

      return res
        .status(400)
        .json({ success: false, message: "This email already exists." });
    }

    // Check if username already exists
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "This username already exists." });
    }

    // Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email format is incorrect." });
    }

    user = await User.create({
      fullname,
      username,
      email,
      password,
      gender,
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
      role: "user",
      mobile: "",
      address: "",
      story: "",
      website: "",
      followers: [],
      following: [],
      saved: [],
    });

    res.status(201).json({ msg: "Register Success", user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    // check if email exist in database
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await user.matchPassword(password);

    //if password does not match
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is incorrect." });
    }

    // Generate an access token
     const token = generateAccessToken(user._id);
    // Return the user details as the response
    res.status(200).cookie("token", token,{
      maxAge: 24 * 60 * 60 * 1000, // cookie expiration time (e.g., 1 day)
      httpOnly: true, // restrict access to the cookie via JavaScript
      secure: true, // only transmit the cookie over HTTPS
      sameSite: "strict", // restrict the cookie to same-site requests
    }).json({
      token,
      user,
    });
    console.log(token)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists in body
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(400).json({ message: "This email does not exists" });
    }

    // compare password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is incorrect." });
    }
    res.status(200).json({ msg: "Logged out!" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
