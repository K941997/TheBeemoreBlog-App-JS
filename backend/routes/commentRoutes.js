const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.get('/:postId', commentController.getComments) // /api/comments
router.get('/', commentController.getAll)
router.post('/', commentController.postComments) 
router.delete('/:commentId', commentController.deleteComment) 



module.exports = router