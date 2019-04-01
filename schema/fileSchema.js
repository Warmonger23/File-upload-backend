const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const fileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

module.exports.fileSchema = fileSchema;
module.exports.fileModel = mongoose.model("Files", fileSchema);