var fs = require('fs');
var ipfsClient = require('ipfs-http-client');

var ipfs = ipfsClient('localhost', '5001', {protocol: 'http'});

const readFile = async (file, callback) => {
    fs.readFile(file, (err, content) => {
        if (err) throw callback(err);
        callback(null, content);
    });
}

readFile('./Guardian.pptx', async (err, content) => {
    if (err) throw err;
    console.log(content);
    tmp_buff = new Buffer(content);
    const ans = await ipfs.add(tmp_buff);
    console.log(ans);
})
