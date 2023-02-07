const router = require("express").Router();
const { pagePrincipal } = require("../controllers/pageController");

router.get("/", pagePrincipal);

module.exports = router;
