const express = require("express");
const router = express.Router();
const { fileModel } = require("../schema/fileSchema");
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
        let File = req.files[key];
        var newpath = req.session.userID + "#" + File.name;
        const file = new fileModel({
            userID: req.session.userID,
            name: File.name,
            path: newpath
        });
        await file.save();
        fs.copyFile(File.path, baseUrl1 + newpath, (err) => {
            if (err) throw err;
        });
    }
    res.result = "Done";
    next();
});

module.exports = router;
