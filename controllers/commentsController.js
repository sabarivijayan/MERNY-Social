const Comment = require("../models/Comment");
const Post = require("../models/Post");

// add comment

exports.addComment = async (req, res) => {
  try {
    const { postId, content, tag, reply, postUserId } = req.body;
    const userId = req._id; // authenticated user ID is stored in req._id
    console.log("this is userId ", userId);

    // if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "This post does not exist." });
    }

    // Create a new comment
    const comment = new Comment({
      content,
      tag: { id: postId },
      reply,
      likes: [],
      postId,
      postUserId,
      user: userId,
    });
    // Save the comment to the database
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { content } = req.body;
    console.log(content);
    // Check if the comment exists
    const comment = await Comment.findById(id);
    // Update the comment content
    comment.content = content;
    await comment.save();

    res.json({ msg: "Update Success!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// like a comment or unlike a comment
exports.likeComment = async(req,res)=>{
    try{
    const comment = await Comment.findById(req.params.id);
    console.log(req.params.id)
    // Update the comment's likes field with the user ID
    comment.likes.push(req._id);
    console.log(req._id)
    await comment.save();

    res.json({ msg: 'Liked Comment!' });

    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

//unlike a comment

exports.unLikeComment = async(req,res)=>{
    try{
    const comment = await Comment.findById(req.params.id);

    // Update the comment's likes field with the user ID
    comment.likes.pull(req._id);
    await comment.save();

    res.json({ msg: 'unliked Comment!' });

    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

// delete a comment

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    console.log(id);
      try {
          const singlePost = await Comment.findByIdAndDelete({ _id: id });
          if(singlePost)
        res.status(201).json(  
          {message:" Deleted Post !",
          });
      else
       res.status(404).json({
        message:  "This post does not exist.",
       })
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  };