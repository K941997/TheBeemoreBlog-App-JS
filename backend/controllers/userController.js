const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const postModel = require("../models/postModel");

//Update User:
const updateUser = async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);

      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json("Update không thành công");
    }
  } else {
    res.status(401).json("You can update only your acc");
  }
};

//Delete User:
const deleteUser = async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const existedUser = await userModel.findById(req.params.id);
      if (!existedUser) {
        return res.status(400).json("User not found");
      }

      try {
        await postModel.deleteMany({ username: existedUser.username }); //Xóa cả các post đi kèm user

        await userModel.findByIdAndDelete(req.params.id);

        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json("Delete not Success");
      }
    } catch (err) {
      res.status(500).json("Delete not Success");
    }
  } else {
    res.status(401).json("You can delete only your acc");
  }
};

//Get User Info:
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//Follow User:
//localhost:5000/api/users/follow?selfId= .....&followingId=...
const followUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.query.selfId, {
      $push: { following: req.query.followingId },
    });
    await userModel.findByIdAndUpdate(req.query.followingId, {
      $push: { followers: req.query.selfId },
    });
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: err });
    console.error(err);
  }
};

//export:
module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
};
