const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

//routers:
router.post("/", categoryController.createCategory ); //có sẵn /api/categories
router.get("/", categoryController.getAllCategories);

//export:
module.exports = router;