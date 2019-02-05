var ipfsClient = require('ipfs-http-client');
const config = require('../config');

var ipfs = ipfsClient(config.ipfs_host, config.ipfs_port, {
    protocol: 'http'
});

ipfsService = {}

ipfsService.add = (data) => {
    tmp_buff = new Buffer(data);
    return (ipfs.add(tmp_buff));
}

ipfsService.cat = (data) => {
    return ipfs.cat(data);
}

exports.ipfsService = ipfsService;