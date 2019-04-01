const express = require("express");
const router = express.Router();
var fs = require("fs");
var async = require("async");
const baseUrl1 = "./public/videos/";
const baseUrl2 = "http://localhost:3020/videos/";
const { fileModel } = require("../schema/fileSchema");

router.get("/", (req, res, next) => {
    console.log("THis is inside files get");
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
    console.log("This is error", res.error);
    console.log("This is the req from the user", req);
    res.result = "Done";
    next();
    async.parallel(Object.values(req.files).map(Video => function (cb) {
        var newpath = baseUrl1 + Video.name;
        console.log("This is req.userID", req.session);
        const files = new fileModel({
            path: newpath,
            userID: req.session.userID,
            name: Video.name
        });
        console.log("Files is ", files);
        fs.copyFile(Video.path, newpath, (err) => {
            cb(err);
        });
    }));
})

module.exports = router;