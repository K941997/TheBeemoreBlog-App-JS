const commentModel = require("../models/commentModel");

//Get Comments:
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentModel
      .find({ post_id: postId })
      .populate({ path: "username" });

    res.send({
      success: 1,
      data: comments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await commentModel.findByIdAndDelete(commentId);
    res.send(deleteComment);
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (req, res) => {
  try {
    const getAllData = await commentModel.find();
    res.send(getAllData);
  } catch (err) {
    console.log(err);
  }
};

const postComments = async (req, res) => {
  try {
    const newCommentData = req.body;
    let newComment = await commentModel.create({
      ...newCommentData,
    });
    newComment = await newComment.populate({ path: "username" });

    console.log(newComment);

    res.send({
      success: 1,
      data: newComment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getComments,
  postComments,
  getAll,
  deleteComment,
};
