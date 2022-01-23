const router = require("express").Router();

const authController = require("../controllers/authController");

const { validateRegister } = require("../commons/middlewares/authValidate");

const tokenJWTAuth = require("../commons/middlewares/tokenJWTAuth");

const adminAuth = require("../commons/middlewares/adminAuth");

//routers:
router.post("/register", validateRegister, authController.registerUser); //có sẵn /api/auth

router.post("/activation", authController.activeAccount);

router.post("/login", authController.loginUser);

router.get("/refresh_token", authController.refreshTokenUser);

router.post("/forgot", authController.forgotPassword);

router.post("/reset", tokenJWTAuth, authController.resetPassword);

router.get("/infor", tokenJWTAuth, authController.getUserInfo);

router.get(
  "/all_infor",
  tokenJWTAuth,
  adminAuth,
  authController.getAllUsersInfo
);

router.get("/logout", authController.logoutUser);

router.put("/update/:id", tokenJWTAuth, authController.updateUser);

router.put(
  "/update_role/:id",
  tokenJWTAuth,
  adminAuth,
  authController.updateUserRole
);

router.delete(
  "/delete/:id",
  tokenJWTAuth,
  adminAuth,
  authController.deleteUser
);

//export:
module.exports = router;
