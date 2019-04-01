const express = require("express");
const router = express.Router();
const { loginUser } = require("../schema/loginSchema");


router.post("/", function (req, res) {
    let { userID, password } = req.body;
    loginUser.update({ userID: userID }, { $set: { userID: userID, password: password } }, (err, options) => {
        if (options.ok > 0) {
            res.send({ code: 200, message: "User password in the system updated" });
        } else {
            res.send({ code: 404, message: "No user found!" });
        }
    });

});

module.exports = router;