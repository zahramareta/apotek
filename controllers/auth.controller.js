// load model
const apotekerModel = require(`../models/apoteker.model`)

// load crypt
const crypt = require(`../crypt`)
const { request, response } = require("../routes/obat.route")

// function untk menampilkan halaman login
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk proses auth
exports.authentication = async (request, response) => {
    try {
        // tampung data username & pw
        let username = request.body.username
        let password = request.body.password

        // cek kecocokan username
        let result = await apotekerModel.ambilDataDenganParameter({username: username})

        // cek keberadaan data apoteker
        if(result.length > 0) {
            // cek kecocokan pw
            if (password === crypt.deskripsi(result[0].password)) {
                // login berhasil
                // menyimpan data user ke session
                request.session.dataUser = result[0]

                // definisi cart di session
                request.session.cart = []
                
                return response.redirect(`/obat`)
            }else{
                // login gagal
                return response.redirect(`/auth`)
            }
            
        }else {
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function logout
exports.logout = async (request, response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

