const { userUpdate } = require("../controllers/user-controller");
const { isAuth } = require("../middlewares/auth-middleware");
const router = require("express").Router();

router.put("/update", isAuth, userUpdate);

module.exports = router;
