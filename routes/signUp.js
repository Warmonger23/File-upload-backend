const express = require("express");
const router = express.Router();
const {loginUser} = require("../schema/loginSchema");

router.post("/", async function (req, res) {
    console.log("User got", req.body.userID, req.body.password);
    loginUser.findOne({ userID: req.body.userID })
        .then(async user => {
            if (!!user) {
                res.send({ code: 404, data: "User already exists in the system" });
            } else {
                const user1 = new loginUser({
                    userID: req.body.userID,
                    password: req.body.password
                });
                await user1.save();
                res.send({ code: 200, data: "User created in the db" });
            }
        });
});

module.exports = router;