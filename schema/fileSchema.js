const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    loginUsers: 
        {
            type: Schema.Types.ObjectId, ref: 'loginUser'
        }
    
});

module.exports.fileSchema = fileSchema;
module.exports.fileModel = mongoose.model("Files", fileSchema);