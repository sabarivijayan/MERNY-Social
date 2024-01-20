const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	
	content: {
		type: "String",
		required: true,
	},
	images: {
		type: ["String"],
		required: true,
	},
	likes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},
	comments: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Comment",
	},
	user: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
		required: true,
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;