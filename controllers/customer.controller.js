/** panggil model customer */
const customerModel = require(`../models/customer.model`)
const { request, response } = require("../routes/obat.route")

/** request -> melihat data customer
 * response -> menampilkan data customer malalui view 
 */
exports.showDataCustomer = async (request, response) => {
    try {
        /** ambil data customer menggunakan model */
        let dataCustomer = await customerModel.ambilDataCustomer()

        /** passing ke view */
        let sendData = {
            page: `customer`,
            data: dataCustomer,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let senddata = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form-customer utk tambah data */
exports.showTambahCustomer = async (request, response) => {
    try {
        /** prepare data yg akan dipassing
         * ke view
         */
        let sendData = {
            nama_customer: ``,
            alamat: ``,
            telepon: ``,
            page: `form-customer`,
            targetRoute: `/pelanggan/add`,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let senddata = {
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
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }
        /** eksekusi tambah data */
        await customerModel.tambahCustomer(newData)

        /** redirect(dialihkan) ke tampilan data pelanggan */
        return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi unt menampilkan data cust yg akan diubah
exports.showEditCustomer = async (request, response) => {
    try {
        // mendapatkan id dari cust yg akan diubah
        let id = request.params.id

        // menampung id ke dlm objek
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let customer = await customerModel.ambilDataDenganParameter(parameter)

        // prepare data yg akan ditampilkan view
        let sendData = {
            nama_customer: customer[0].nama_customer,
            alamat: customer[0].alamat,
            telepon: customer[0].telepon,
            page: `form-customer`,
            targetRoute: `/pelanggan/edit/${id}`,
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
            nama_customer: request.body.nama_customer, //**baca post pake body */
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        // eksekusi perubahan data
        await customerModel.ubahCustomer(perubahan, parameter)

        // direct ke tampilan customer
        return response.redirect(`/pelanggan`)
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
        await customerModel.hapusCustomer(parameter)

        /** redirect to pelanggan page */
        return response.redirect(`/pelanggan`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}