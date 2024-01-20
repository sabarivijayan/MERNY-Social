const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: [mongoose.Types.ObjectId],
    required: true
  
  },
  url: {
    type: String,
  },
  text: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
