const { addConcert , get_all_concerts} = require("../controller/concertController");

const router = require("express").Router(); 


router.post("/add", addConcert)
router.get("/", get_all_concerts)

module.exports = router