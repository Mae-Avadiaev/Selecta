const crypto = require("crypto");
const detectCharacterEncoding = require('detect-character-encoding');

// exports.encrypt = (message, Securitykey) => {
//
//     const algorithm = "aes-256-cbc";
//     const initVector = crypto.randomBytes(16);
//     console.log(initVector)
//     const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
//     let encryptedData = cipher.update(message, "utf-8", "hex");
//     encryptedData += cipher.final("hex");
//     return (initVector, encryptedData);
// }
//
// exports.decrypt = (obj, Securitykey) => {
//     const algorithm = "aes-256-cbc";
//     console.log(Buffer.from(obj.iv, 'base64'))
//     // console.log(detectCharacterEncoding(obj.iv))
//     const decipher = crypto.createDecipheriv(algorithm, Securitykey, Buffer.from(obj.iv, 'base64'));
//     let decryptedData = decipher.update(obj.encryptedData, "hex", "utf-8");
//     decryptedData += decipher.final("utf8");
//     return decryptedData;

    // let decipher = crypto.createDecipheriv('aes-256-cbc', key, text.iv);
    // let decrypted = decipher.update(text.encryptedData, "hex", "utf-8");
    // decrypted += decipher.final("utf8");
    // console.log("he2")
    // return decrypted.toString();
// }