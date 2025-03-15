const { signUp } = require("../controllers/auth-controller");

const router = require("express").Router();

router.post("/sign-up", signUp);

module.exports = router;
