const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const env = require("dotenv")
env.config()


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
    minlength :[6,"password must be atleast 6 characters"],
    select:false
  }, 
  avatar: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg',
  },
  role: {
    type: String,
  },
  gender:{
   type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  createdAt :{
    type :Date,
    default:Date.now,
    immutable:true
  },
  updatedAt :{
    type :Date,
    default:Date.now
  }
});


userSchema.pre("save",async function(next){
    if(this.isModified("password")){this.password = await bcrypt.hash(this.password,10)}

    next();
})


userSchema.methods.matchPassword = async function(password){
    console.log(password)
    return await bcrypt.compare(password,this.password)
   }
   
  
   
const User = mongoose.model('User', userSchema);

module.exports = User;
