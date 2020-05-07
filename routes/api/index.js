const router = require("express").Router();
const tradieRoutes = require("./tradies");
const profile = require( './profile' );
const users = require("./users");
const reviews = require("./reviews");



// Tradie routes
router.use("/api/tradies", tradieRoutes);
router.use("/api/users", users);
router.use( "/api/profile", profile);
router.use( "/api/reviews", reviews);

module.exports = router;
