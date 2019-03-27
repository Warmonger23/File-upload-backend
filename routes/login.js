const express = require("express");
const router = express.Router();
const { loginSchema, loginUser } = require("../schema/loginSchema");

router.post("/signup", async function (req, res) {
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

router.post("/reset", function (req, res) {
  let { userID, password } = req.body;
  loginUser.update({ userID: userID }, { $set: { userID: userID, password: password } }, (err, options) => {
    if (options.nModified > 0) {
      res.send({ code: 200, data: "User password in the system updated" });
    } else {
      res.send({ code: 404, data: "No user found!" });
    }
  });

});

module.exports = router;
