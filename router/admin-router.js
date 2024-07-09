const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")


router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router.route("/blogs").get(authMiddleware, adminMiddleware, adminController.getAllBlogs);

router.route("/users/:id/edit").get(authMiddleware, adminMiddleware, adminController.getUserById);

router.route("/blogs/:id/edit").get(authMiddleware, adminMiddleware, adminController.getBlogById);

router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router.route("/blogs/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateBlogById);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

router.route("/blogs/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteBlogById);

router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;