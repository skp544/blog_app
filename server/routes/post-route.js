const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/auth-middleware");
const {
  create,
  update,
  getAllPosts,
  getSinglePost,
  deletePost,
  getPostsByUserId,
  getPostBySlug,
} = require("../controllers/post-controller");

router.post("/create", isAuth, isAdmin, create);
router.put("/update/:id", isAuth, isAdmin, update);
router.get("/all", getAllPosts);
router.get("/:id", getSinglePost);
router.delete("/delete/:id", isAuth, isAdmin, deletePost);
router.get("/posts/user", getPostsByUserId);
router.get("/posts/:slug", getPostBySlug); // not using
module.exports = router;
