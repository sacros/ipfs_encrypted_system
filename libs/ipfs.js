// var fs = require('fs');
var ipfsClient = require('ipfs-http-client');
const config = require('../config');

var ipfs = ipfsClient(config.ipfs_host, config.ipfs_port, {protocol: 'http'});

ipfsService = {}

ipfsService.add = (data) => {
    // return new Promise((resolve, reject) => {
        tmp_buff = new Buffer(data);
        return(ipfs.add(tmp_buff));
        // resolve(ans);
    // })
}

ipfsService.cat = (data) => {
    return ipfs.cat(data);
}


// encryptAsync(data, password) {
//     return new Promise((resolve, reject) => {
//         try {
//             var cipher = Crypto.createCipher('aes-256-cbc', password);
//             var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
//             resolve(encrypted);
//         } catch (exception) {
//             reject({
//                 message: exception.message
//             });
//         }
//     });
// }


// readFile('./Guardian.pptx', async (err, content) => {
//     if (err) throw err;
//     console.log(content);
//     tmp_buff = new Buffer(content);
//     const ans = await ipfs.add(tmp_buff);
//     console.log(ans);
// })

exports.ipfsService = ipfsService;