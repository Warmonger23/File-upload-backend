const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String
    },
    company_name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    county: {
      type: String
    }
  });

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model("User", userSchema);