const { Safe } = require("./safe");

const fs = require('fs');

function readContent(file, callback) {
    fs.readFile(file, (err, content) => {
        if (err) throw callback(err);
        callback(null, content);
    });
}

var safe = new Safe("encrypted_file", "password123");
readContent('./Guardian.pptx', (err, content) => {
    if (err) throw err;
    console.log("original file:", content);
    safe.encryptAsync(content).then(result => {
        console.log("encrypted file:",result);
        return safe.decryptAsync();
    })
    .then(result => {
        console.log("decrypted file:", result);
        result = new Buffer(result, "utf8");
        fs.writeFile('./decrypted_file.pdf', result, (err) => {
            if(err) throw err
            console.log("Successfull");
        })
        console.log(result);
    })
})
