const Crypto = require('crypto');

class Safe {

    encryptAsync(data, password) {
        return new Promise((resolve, reject) => {
            try {
                var cipher = Crypto.createCipher('aes-256-cbc', password);
                var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
                resolve(encrypted);
            } catch (exception) {
                reject({
                    message: exception.message
                });
            }
        });
    }

    decryptAsync(data, password) {
        return new Promise((resolve, reject) => {
            try {
                var decipher = Crypto.createDecipher("aes-256-cbc", password);
                var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
                resolve(decrypted);
            } catch (exception) {
                reject({
                    message: exception.message
                });
            }
        });
    }

}

exports.Safe = Safe;