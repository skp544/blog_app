const {
  userUpdate,
  deleteUser,
  getAllUsers,
  deleteAnotherUser,
} = require("../controllers/user-controller");
const { isAuth, isAdmin } = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.put("/update", isAuth, userUpdate);
router.delete("/delete", isAuth, deleteUser);
router.get("/all-users", isAuth, isAdmin, getAllUsers);
router.delete("/delete-user/:id", isAuth, isAdmin, deleteAnotherUser);

module.exports = router;
