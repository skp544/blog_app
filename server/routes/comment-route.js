const {
  createComment,
  getPostComments,
  editComment,
  likeComment,
} = require("../controllers/comment-controller");
const { isAuth } = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.post("/create", isAuth, createComment);

router.get("/post-comments/:postId", getPostComments);

router.put("/edit/:id", isAuth, editComment);

router.put("/like/:commentId", isAuth, likeComment);

module.exports = router;
