const frisby = require('frisby');
const fs = require("fs");
const path = require('path');
const Joi = frisby.Joi;

describe("test suite", function () {

    beforeAll(() => {
        frisby.globalSetup({
            request: {
                headers: {
                    // "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
                }
            }
        });
        jest.setTimeout(20000);
    });

    it("should accept and upload a file", (done) => {
        const csvPath = path.resolve(__dirname, './file.csv');
        let content = fs.createReadStream(csvPath);
        let formData = frisby.formData();

        formData.append('file', content);

        return frisby.post("http://localhost:3020/file", { body: "" })
            .expect('json', {
                code: 200,
                data: "Done"
            })
            .done(done);
    });
});
