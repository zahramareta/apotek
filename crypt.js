// memanggil library crypto
const crypto = require(`crypto-js`)

// membuat fungsi untuk enkripsi
exports.enkripsi = (plainText) => {
    // bikin secret key
    let secretKey = `YTTA`

    // proses enkripsi
    let result = crypto.AES.encrypt(plainText, secretKey).toString() //advanced encryption standart
    return result 
}

// membuat fungsi deskripsi
exports.deskripsi = (chiperText) => {
    // define secret key
    let secretKey = `YTTA`

    // proses deskripsi
    let byte = crypto.AES.decrypt(chiperText, secretKey)
    let result = byte.toString(crypto.enc.Utf8)

    return result

}