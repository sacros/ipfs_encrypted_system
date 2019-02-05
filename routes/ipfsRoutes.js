var express = require("express");
var fs = require("fs");
var config = require("../config");
const routes = express.Router();
const { Safe } = require("../libs/safe");
const { ipfsService } = require("../libs/ipfs");

safe = new Safe();

routes.get("/test", (req, res) => {
  console.log("its working");
});

routes.route("/upload").post((req, res) => {
  if (req.body["pass"] == undefined)
    res.json({
      message: "Got error",
      error: "Argument 'pass' not present"
    });
  safe
    .encryptAsync(req.files.file, req.body["pass"])
    .then(result => {
      ipfsService.add(result).then(result => {
        res.json(result);
        console.log("uploaded file to IPFS")
      });
    })
    .catch(err => {
      console.log(err);
    });
});

routes.route("/read").post((req, res) => {
  // pass = "password123";
  // hash = "Qmf6PdKCGoaADihUqs95MLdwcnv72k1mKijEA4fJw4V3tP";
  pass = req.body["pass"];
  hash = req.body["hash"];
  ipfsService
    .cat(hash)
    .then(data => {
      safe
        .decryptAsync(data, pass)
        .then(data => {
          filename = Date.now() + JSON.parse(data)["name"];
          result = new Buffer(JSON.parse(data)["data"], "utf8");
          fs.writeFile(config.files_paths + filename, result, error => {
            if (error) {
              console.log(error);
            }
            res.download(config.files_paths + filename);
            // var stream = fs.createReadStream(filename);
            // stream.pipe(res).once("close", function() {
            //   stream.destroy();
            //   fs.unlink(config.files_paths + filename, (err) => {
            //       if(err) console.log(err);
            //       else console.log(filename+" deleted");
            //   });
            // });
            console.log("downloaded file from IPFS");
          });
        })
        .catch(err => console.log("err:", err));
    })
    .catch(err => console.log("Got err:", err));
});

module.exports = routes;
