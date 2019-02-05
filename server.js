var createServer = require("http").createServer;
var express = require("express");
var app = express();
var server = createServer(app);
var config = require("./config");
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var ipfsRoutes = require('./routes/ipfsRoutes');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(fileUpload());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use("/ipfs/", ipfsRoutes);

server.listen(config.server_port, "localhost", err => {
    if (err) throw err;
    console.log("Listening on port ", config.server_port);
});