const express = require("express");
const router = express.Router();
var fs = require("fs");
const formidable = require("formidable");

const baseUrl1 = "./public/images/";
const baseUrl2 = "http://localhost:3020/images/";

router.get("/", (req, res, next) => {
    console.log("Inside image");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    fs.readdir(baseUrl1, (err, items) => {
        if (err) {
            res.send({ code: "404", data: err });
        }
        let result = items.map(item => {
            return { key: baseUrl2 + item, value: item };
        });
        res.result = result;
        next();
    });
});

router.post("/", (req, res, next) => {
    console.log("This is req.session". req.session);
    for (let key in req.files) {
        console.log("Key = " + key + " value: " + req.files[key]);
        let File = req.files[key];
        var newpath = baseUrl1 + File.name;
        console.log("Name of the file", File.name);
        fs.copyFile(File.path, newpath, (err) => {
            if (err) throw err;
        });
    }
    res.result = "Done";
    next();
});

module.exports = router;
