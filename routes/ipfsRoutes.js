var express = require('express');
var fs = require('fs');

const routes = express.Router();
const { Safe } = require('../libs/safe');
const { ipfsService } = require('../libs/ipfs');

safe = new Safe();
// ipfsService.add('yolo')
// .then((data) => {
//     console.log(data);
// })
// safe.encryptAsync('a', 'b')
// .then((data) => console.log(data));

routes.get("/test", (req, res) => {
    console.log("working");
})

routes.route('/upload').post((req, res) => {
    console.log(req.files);
    console.log(req.body);
    if (req.body['pass'] == undefined) res.json({
        message: "Got error",
        error: "Argument 'pass' not present"
    });
    console.log("entering async");
    console.log("encrypting file:", req.files.file.data);
    safe.encryptAsync(req.files.file.data, req.body['pass'])
        .then((result) => {
            console.log("got here", result);
            ipfsService.add(result)
                .then((result) => {
                    res.json(result)
                });
        })
        .catch((err) => {
            console.log(err);
        })
});

routes.get("/read", (req, res) => {
    pass = "password123";
    // hash = "QmYAjeA2731XmbzWVu9ojTbeAz7874x1HrypjfE97TWrZJ";
    hash = "QmThGQzupdpwAX2dGx3Ac3QZfGbwr6pvwEhhoyj7o977Vh";
    ipfsService.cat(hash)
        .then((data) => {
            // console.log("____data____:",data)
            // data = JSON.parse(data);
            // data = new Buffer(data);
            safe.decryptAsync(data, pass)
            .then((data) => {
                console.log("data1", data);
                // console.log("data2", data.toString());
                console.log("data3", JSON.parse(data));
                console.log("data5", JSON.parse(data.toString()));
                // data = new Buffer(data);
                console.log("data4", data);
                console.log("Got data: ", data)
                result = new Buffer(JSON.parse(data.toString()), "utf8");
                fs.writeFile('./tmp.pptx', result, error => {
                    if (error) {
                        console.log(error)
                    }
                    res.download('./tmp.pptx');
                    // resolve({
                    //     message: "Encrypted!"
                    // });
                });
                // res.download(data);
            })
            .catch(err => console.log("err:", err));
        })
        .catch((err) => console.log("Got err:", err));
})

module.exports = routes;