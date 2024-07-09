const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware")
const userControllers  = require("../controllers/user-controller")


router.route('/update-user-details/:id').patch(authMiddleware, userControllers.updateUserDetailsById)

router.route("/blogs").get(userControllers.getAllBlogs)

router.route("/blogs/post").post(authMiddleware, userControllers.postBlogs)

router.route("/blogs/delete").delete(userControllers.deleteBlogs)

router.route("/blogs/read/:id").get(userControllers.getSingleBlogToReadById)

router.route('/blogs/:id/edit').get(authMiddleware, userControllers.getSingleBlogById)

router.route('/blogs/update/:id').patch(authMiddleware, userControllers.updateBlogsById)

router.route('/blogs/delete/:id').delete(authMiddleware, userControllers.deleteBlogsById)

router.route('/blogs/:username/get').get(authMiddleware, userControllers.getUsersBlogByUsername)

router.route('/blogs/:id/reactions').post(authMiddleware, userControllers.updateReactionByUser);


module.exports = router;