/** panggil model customer */
const apotekerModel = require(`../models/apoteker.model`)
const { request, response } = require("../routes/apoteker.route")

// memanggil file crypt.js
const crypt = require(`../crypt`) 

/** request -> melihat data customer
 * response -> menampilkan data customer malalui view 
 */
exports.showDataApoteker = async (request, response) => {
    try {
        /** ambil data customer menggunakan model */
        let dataApoteker = await apotekerModel.ambilDataApoteker()

        /** passing ke view */
        let sendData = {
            page: `apoteker`,
            data: dataApoteker,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let senddata = {
            message: error
        }
        return response.render(`../views/error-page`, senddata)
    }
}

/** fungsi utk menampilkan form-customer utk tambah data */
exports.showTambahApoteker = async (request, response) => {
    try {
        /** prepare data yg akan dipassing
         * ke view
         */
        let sendData = {
            nama_apoteker: ``,
            username: ``,
            password: ``,
            page: `form-apoteker`,
            targetRoute: `/apoteker/add`,
            dataUser: request.session.dataUser,
            deskripsi: crypt.deskripsi,
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data customer baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_apoteker: request.body.nama_apoteker,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        /** eksekusi tambah data */
        await apotekerModel.tambahApoteker(newData)

        /** redirect(dialihkan) ke tampilan data pelanggan */
        return response.redirect(`/apoteker`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi unt menampilkan data cust yg akan diubah
exports.showEditApoteker = async (request, response) => {
    try {
        // mendapatkan id dari cust yg akan diubah
        let id = request.params.id

        // menampung id ke dlm objek
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let apoteker = await apotekerModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_apoteker: apoteker[0].nama_apoteker,
            username: apoteker[0].username,
            password: apoteker[0].password,
            page: `form-apoteker`,
            targetRoute: `/apoteker/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untk menyimpan data yg diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatkan id yg diubah
        let id = request.params.id //**baca get pake params */

        // membungkus id ke bentuk objek
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dlm objek 
        let perubahan = {
            nama_apoteker: request.body.nama_apoteker, //**baca post pake body */
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        // eksekusi perubahan data
        await apotekerModel.ubahApoteker(perubahan, parameter)

        // direct ke tampilan customer
        return response.redirect(`/apoteker`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// unt tombol hapus
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of pelanggan */
        await apotekerModel.hapusApoteker(parameter)

        /** redirect to pelanggan page */
        return response.redirect(`/apoteker`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}