const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { id, recipients, url, text } = req.body;
    const userId = req._id;  //authenticated user id
     console.log(req._id)
    // Create a new notification
    const notification = new Notification({
      user: userId,
      recipients:recipients,
      url,
      text,
      isRead: false,
      id
    });

    // Save the notification to the database
    await notification.save();

    res.status(201).json({ notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteNotification = async (req, res) => {
    const { id } = req.params;
    console.log(id);
      try {
          const singlePost = await Post.findByIdAndDelete({ _id: id });
          if(singlePost)
        res.status(201).json(  
          {message:" Notification deleted successfully.",
          singlePost});
      else
       res.status(404).json({
        message:  "This post does not exist.",
       })
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  };