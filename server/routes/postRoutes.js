const {Router} = require('express');

const {createPost, getPosts, getPost, getCatPosts, getUserPosts, 
   editPost, deletePost} = require('../controllers/postControllers')
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/:id', editPost)
router.get('/categories/:category', getCatPosts)
router.patch('/:id', authMiddleware, editPost)
router.get('/users/:id', authMiddleware, getUserPosts)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router;