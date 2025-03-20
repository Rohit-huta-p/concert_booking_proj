
const { registerUser, login,bookConcert, get_all_booked_concerts } = require("../controller/userController");
const { verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();


router.post("/register", registerUser)
router.post("/login", login)
router.post("/bookconcert",verifyToken, bookConcert)
router.get("/bookedconcerts",verifyToken, get_all_booked_concerts)

module.exports = router



