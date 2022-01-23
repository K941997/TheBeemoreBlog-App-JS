const router = require("express").Router();
const postController = require("../controllers/postController");
const tokenJWTAuth = require("../commons/middlewares/tokenJWTAuth");

//routers:
router.post("/", tokenJWTAuth, postController.createPost); //có sẵn /api/posts

router.put("/:id", tokenJWTAuth, postController.updatePost);

router.delete("/:id", tokenJWTAuth, postController.deletePost);

router.put("/:id/like", tokenJWTAuth, postController.likePost);

// router.post("/", postController.createPost); //có sẵn /api/posts
// router.put("/:id", postController.updatePost);
// router.delete("/:id", postController.deletePost);
// router.put('/:id/like', postController.likePost);

router.get("/:id", postController.getPost);

router.get("/", postController.getAllPosts);

router.get("/limit/abc", postController.getThreePost);
router.patch("/:id", postController.reviews);

//export:
module.exports = router;
