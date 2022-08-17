const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const Like = require("../../../models/likes");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post._id });
      await Like.deleteMany({ likeable : {$in : post.comments}})
      await Comment.deleteMany({ post: req.params.id });
      post.remove();
      return res.json(200, {
        message: "post and associated comments (likes included) deleted successfully",
      });
    } else {
      return res.json(401, {
        message: "You are not authorized to delete this post.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500);
  }
};
