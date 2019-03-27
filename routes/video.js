const express = require("express");
const router = express.Router();
var fs = require("fs");
var async = require("async");
const baseUrl1 = "./public/videos/";
const baseUrl2 = "http://localhost:3020/videos/";

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
    res.result = "Done";
    next();
    async.parallel(Object.values(req.files).map(Video=>function(cb){
        var newpath = baseUrl1 + Video.name;
        console.log("Name of the file", Video.name);
        fs.copyFile(Video.path, newpath, (err) => {
            cb(err);
        });
    }));
})

module.exports = router;