const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("This req inside signout1", req.headers);
    console.log("This req inside signout2", req.body);
    req.session.destroy(() => {
        res.result = "Session is destroyed";
        // console.log("Req session in signout", req.session);
        // req.logout();
    });
    next();
});

module.exports = router;