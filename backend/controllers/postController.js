const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

//Create Post:
const createPost = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    const existedPost = await postModel.findOne({ title: req.body.title });
    if (existedPost) {
      return res.status(400).json("Đã tồn tại title này");
    }

    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Update Post:
const updatePost = async (req, res) => {
  try {
    const existedPost = await postModel.findById(req.params.id);

    if (!existedPost) {
      return res.status(400).json("Không tìm thấy bài post");
    }

    if (existedPost.username === req.body.username) {
      try {
        const updatedPost = await postModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Delete Post:
const deletePost = async (req, res) => {
  try {
    const existedPost = await postModel.findById(req.params.id);
    if (!existedPost) {
      return res.status(400).json("Không tìm thấy bài post");
    }

    if (existedPost.username === req.body.username) {
      try {
        await existedPost.delete();

        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Like Post:
const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }
    //find post:
    const existedPost = await postModel.findById(id);
    if (!existedPost) {
      return res.status(400).json({ message: "This post not found" });
    }

    const index = existedPost.likes.findIndex(
      (id) => id === String(req.userId)
    );
    if (index === -1) {
      //likepost
      existedPost.likes.push(req.userId);
    } else {
      //dislike
      existedPost.likes = existedPost.likes.filter(
        (id) => id !== String(req.userId)
      );
    }

    //like post:
    const postLike = await postModel.findOneAndUpdate(
      { _id: id },
      existedPost,
      { new: true }
    );

    res.status(200).json({
      success: 1,
      data: postLike,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Get Post:
const getPost = async (req, res) => {
  try {
    const existedPost = await postModel.findById(req.params.id);

    if (!existedPost) {
      return res.status(400).json("Không tìm thấy bài post");
    }
    const userData = await userModel.findById(existedPost.postedBy);
    const { username, picture } = userData;
    res.status(200).json({ ...existedPost, username, picture });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Posts:
const getAllPosts = async (req, res) => {
  const userId = req.query.postedBy;

  const categoryName = req.query.category;

  try {
    let posts;
    if (userId) {
      posts = await postModel.find({ postedBy: userId });
    } else if (categoryName) {
      posts = await postModel.find({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      posts = await postModel.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const reviews = async (req, res) => {
  try {
    const { rating } = req.body;
    console.log(rating);

    if (rating && rating !== 0) {
      const product = await postModel.findById(req.params.id);
      if (!product)
        return res.status(400).json({ msg: "Product does not exist." });

      let num = product.numReviews;
      let rate = product.rating;

      await postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating: rate + rating,

          numReviews: num + 1,
        }
      );

      res.json({ msg: "Update success" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getThreePost = async (req, res) => {
  try {
    const getPost = await postModel.find().limit(4);
    res.send({
      success: 1,
      data: getPost,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//export:
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  likePost,
  reviews,
  getThreePost,
};
