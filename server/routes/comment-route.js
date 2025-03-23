const {
  createComment,
  getPostComments,
} = require("../controllers/comment-controller");
const { isAuth } = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.post("/create", isAuth, createComment);

router.get("/post-comments/:postId", getPostComments);

module.exports = router;
