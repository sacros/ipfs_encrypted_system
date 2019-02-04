const FileSystem = require('fs');
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
    /*
        encryptAsync(data, password, callback) {
        // return new Promise((resolve, reject) => {
        try {
            var cipher = Crypto.createCipher('aes-256-cbc', password);
            var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
            callback(null, encrypted);
        } catch (exception) {
            callback({
                message: exception.message
            });
        }
        // });
    }

    */

    // encrypt(data) {
    //     try {
    //         var cipher = Crypto.createCipher('aes-256-cbc', this.password);
    //         var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);
    //         FileSystem.writeFileSync(this.filePath, encrypted);
    //         return {
    //             message: "Encrypted"
    //         };
    //     } catch (exception) {
    //         throw new Error(exception.message);
    //     }
    // }

    decryptAsync(data, password) {
        return new Promise((resolve, reject) => {
            try {
                var decipher = Crypto.createDecipher("aes-256-cbc", password);
                var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
                resolve(decrypted);
                // resolve(JSON.parse(decrypted.toString()));
            } catch (exception) {
                reject({
                    message: exception.message
                });
            }
        });
    }

    // decrypt() {
    //     try {
    //         var data = FileSystem.readFileSync(this.filePath);
    //         var decipher = Crypto.createDecipher("aes-256-cbc", this.password);
    //         var decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    //         return JSON.parse(decrypted.toString());
    //     } catch (exception) {
    //         throw new Error(exception.message);
    //     }
    // }

}

exports.Safe = Safe;