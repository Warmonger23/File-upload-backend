const express = require("express");
const router = express.Router();
const {fileModel} = require("../schema/fileSchema");
var fs = require("fs");

const baseUrl1 = "./public/files/";
const baseUrl2 = "http://localhost:3020/files/";

router.get("/", (req, res, next) => {
    console.log("Inside Files get");
    fs.readdir(baseUrl1, (err, items) => {
        if (err) {
            res.send({ code: "404", data: err });
        }
        console.log("Items", items);
        let result = items.map(item => {
            return { key: baseUrl2 + item, value: item };
        });
        res.result = result;
        next();
    });
});

router.post("/", async (req, res, next) => {
    
    for (let key in req.files) {
        console.log("Key = " + key + " value: " + req.files[key]);
        let File = req.files[key];
        var newpath = baseUrl1 + File.name;
        console.log("Req ", req.session.userID);
        
        const file = new fileModel({
            path: newpath,
            loginUser: req.session.userID
        });
        await file.save();
        console.log("Name of the file", File.name);
        fs.copyFile(File.path, newpath, (err) => {
            if (err) throw err;
        });
    }
    res.result = "Done";
    next();
});

module.exports = router;
