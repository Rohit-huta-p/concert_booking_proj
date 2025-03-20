
const { registerUser, login,bookConcert, get_all_booked_concerts, edit_tickets } = require("../controller/userController");
const { verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();


router.post("/register", registerUser)
router.post("/login", login)
router.post("/bookconcert",verifyToken, bookConcert)
router.get("/bookedconcerts",verifyToken, get_all_booked_concerts)
router.post("/editTickets",verifyToken, edit_tickets)

module.exports = router



