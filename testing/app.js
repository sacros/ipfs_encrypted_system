const { Safe } = require("../safe");

const fs = require('fs');

function readContent(file, callback) {
    fs.readFile(file, (err, content) => {
        if (err) throw callback(err);
        callback(null, content);
    });
}

var safe = new Safe("safe.dat", "my-password");
readContent('./DotPay.pdf', (err, content) => {
    if (err) throw err;
    safe.encryptAsync(content).then(result => {
        console.log(result);
        return safe.decryptAsync();
    })
    .then(result => {
        result = new Buffer(result, "utf8");
        fs.writeFile('./output.pdf', result, (err) => {
            if(err) throw err
            console.log("Successfull");
        })
        console.log(result);
    })
})
