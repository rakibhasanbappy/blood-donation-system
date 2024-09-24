// external dependencies
const router = require('express').Router();

// internal dependencies


// routes
router.get("/", (req, res) => {
    res.send("Welcome to the requests route");
});

// export the router
module.exports = router;

