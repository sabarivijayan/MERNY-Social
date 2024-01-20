const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  console.log("Creating post");
  try {
    const {content,images} = req.body;
   console.log(content ,images)
    if (!content) {
      return res.status(400).json({ message: "No content" });
    } else {
      const user = await User.findOne({ _id: req._id });
      const newPost = await Post.create({
        content,
        images:images,
        user: user,
      });

      user.saved.push(newPost._id )

      const {
        _id,
        fullname,
        username,
        email,
        password,
        createdAt,
        updatedAt,
        __v,
      } = user;
      if (newPost) {
        res.status(200).json({
          message: "Created Post!",
          newPost,
          _id,
          fullname,
          username,
          email,
          password,
          createdAt,
          updatedAt,
          __v,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  exports.getPosts = async (req, res) => {
    try {
      const user = await User.findById(req._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve the details of all the posts of the logged-in user from your data source
      const posts = await Post.find({ user: req._id }).populate("user");
      console.log("Posts:", posts); // Check the posts array and its contents
console.log("User:", user); // Check the user object

      res.status(200).json({
        msg: "Success!",
        result: posts.length,
        posts: posts,
        user :user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// delete the post 

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
	try {
		const singlePost = await Post.findByIdAndDelete({ _id: id });
		if(singlePost)
      res.status(201).json(  
        {message:" Deleted Post !",
        singlePost});
    else
     res.status(404).json({
      message:  "This post does not exist.",
     })
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
  
// Like or unlike a post
// exports.likeAndUnlikePost = async(req,res)=>{
//   try{
//    const post = await Post.findById(req.params.id);

//    if(!post){
//     return  res.status(404).json({
//       message:"post not found"
//     })
//    }
//    if(post.likes.includes(req._id)){
//        const index = post.likes.indexOf(req._id);
//        post.likes.splice(index,1);
//        await post.save();

//        return res.status(200).json({
//         success:true,
//         message:"Unliked"
//        })
    
//    } else{
  
//     post.likes.push(req._id);
//     await post.save();
    
//     return res.status(200).json({
//       success:true,
//       message:"liked"
//      })
//    }

//   }catch(error){
//     res.status(500).json({
//       success:false,
//       message:error.message,
//     })
//   }
// }

// like a comment or unlike a comment
exports.likePost = async(req,res)=>{
  try{
  const post = await Post.findById(req.params.id);
  console.log(req.params.id)
  // Update the comment's likes field with the user ID
  post.likes.push(req._id);
  console.log(req._id)
  await post.save();

  res.json({ msg: 'Liked Post!' });

  }catch(error){
      res.status(500).json({
          message:error.message,
      })
  }
}

//unlike a comment

exports.unLikePost = async(req,res)=>{
  try{
  const post = await Post.findById(req.params.id);

  // Update the comment's likes field with the user ID
  post.likes.pull(req._id);
  await post.save();

  res.json({ msg: 'unliked Post!' });

  }catch(error){
      res.status(500).json({
          message:error.message,
      })
  }
}
