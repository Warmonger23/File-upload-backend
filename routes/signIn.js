const express = require("express");
const router = express.Router();
const { loginUser } = require("../schema/loginSchema");

router.post("/", function (req, res, next) {
    console.log("req", req.body);
    loginUser
        .findOne({ userID: req.body.userID, password: req.body.password })
        .then(user => {
            console.log("This is req.body.userID", req.body.userID);
            if (user) {
                req.session.userID = req.body.userID;
                res.send({ code: "200", message: "success" });
            }
            else {
                console.log("User2", user);
                res.send({ code: "404", message: "failed" });
            }
        });

});

module.exports = router;