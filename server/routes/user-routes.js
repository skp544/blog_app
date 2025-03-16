const { userUpdate, deleteUser } = require("../controllers/user-controller");
const { isAuth } = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.put("/update", isAuth, userUpdate);
router.delete("/delete", isAuth, deleteUser);

module.exports = router;
