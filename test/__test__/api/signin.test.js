const frisby = require('frisby');
const fs = require("fs");
const Joi = frisby.Joi;

const appkey = "06758e99be484fca56fb";


const body = {
    userID: "a",
    password: "aa"
}


describe("sigin in functionality", function () {

    beforeAll(() => {
        // frisby.globalSetup({
        // //     request: {
        // //         headers: {
        // //             appkey: appkey,
        // //             "content-type": "application/json"
        // //         }
        // //     }
        // // });
    });

    it("signing in", (done) => {
        return frisby.post("http://localhost:3020/signin", body)
            .expect('status', 200)
            .expect('json', 'code', 200)
            .then((res) => {
                console.log("This is res", res);
                return frisby.get("http://localhost:3020/file")
                    .expect('status', 200)
                    .expect('jsonTypes', 'data.*', {
                        "userID": Joi.string().required(),
                        "password": Joi.number().required()
                    });
            })
            .done(done);
    });

    function checkMulitple(id, size, accounts) {
        // console.log("Check", id, size, accounts);
        
        if (size > 0) {
            let nbody = {
                userID: accounts[id].userID,
                password: accounts[id].password
            }
            return frisby.post("http://localhost:3020/signin", nbody)
            .expect('status', 200)
            .then(res => {
                size--;
                checkMulitple(id + 1, size, accounts);
            });
        }
    }
});