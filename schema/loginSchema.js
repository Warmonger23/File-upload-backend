const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  });

module.exports.loginSchema = loginSchema;
module.exports.loginUser = mongoose.model("loginUser", loginSchema);