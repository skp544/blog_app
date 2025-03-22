const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/auth-middleware");
const {
  create,
  update,
  getAllPosts,
  getSinglePost,
  deletePost,
} = require("../controllers/post-controller");

router.post("/create", isAuth, isAdmin, create);
router.put("/update/:id", isAuth, isAdmin, update);
router.get("/all", getAllPosts);
router.get("/:id", getSinglePost);
router.delete("/delete/:id", isAuth, isAdmin, deletePost);

module.exports = router;
