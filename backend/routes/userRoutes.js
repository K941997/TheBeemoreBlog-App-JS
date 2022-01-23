const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

//routers:
router.put("/follow", userController.followUser);
router.put("/:id", userController.updateUser); //có sẵn /api/users
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
//localhost:5000/api/users/follow?selfId= .....&followingId=...

//export:
module.exports = router;
