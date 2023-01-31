// panggil model obat
const obatModel = require(`../models/obat.model`)

// panggil model cust
const customerModel = require(`../models/customer.model`)
const { request, response } = require("express")

// panggil model transaksi
const transaksiModel = require(`../models/transaksi.model`)

// panggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)



// buat function utk menampilkan form transaksi
exports.showFormTransaksi = async (request, response) => {
    try {
        // ambil data obat
        let obat = await obatModel.findAll()
        // ambil data cust
        let customer = await customerModel.ambilDataCustomer()

        // prepare data yg akan dipasing di view
        let sendData = {
            dataObat: obat,
            dataCustomer: customer,
            page: `form-transaksi`,
            no_faktur: ``,
            tgl_transaksi: ``,
            dataObatString: JSON.stringify(obat),
            // java script object notation
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menambahkan obat ke cart
exports.addToCart = async (request, response) => {
    try {
        // dapatkan data obat berdasarkan id obat yang dikirimkan
        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat
        })
        // tampung / receive data yg dikirimkan 
        let storeData = {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }

        // masukkan data ke keranjang menggunakan session
        request.session.cart.push(storeData) //menambah data ke dalam array
        
        // direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk menghapus data cart
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh data cart pd session
        let cart = request.session.cart

        // ambil id obat yg akan dihapus
        let id_obat = request.params.id

        // cari tau posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_obat == id_obat)

        // hapus data sesuai index
        cart.splice(index, 1) //untk menghapus data dlm array

        // mengembalikan data cart ke dalam session
        request.session.cart = cart

        // direct ke form trnsksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fundtion untk meyimpan data transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yg dikirimkan 
        let newTransaksi = {
            no_faktur: request.body.no_faktur,
            tgl_transaksi: request.body.tgl_transaksi,
            id_customer: request.body.id_customer,
            id_apoteker: request.session.dataUser.id
        }

        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        // manampung isi cart 
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // hapus dulu data nama obat dari cart
            delete cart[i].nama_obat

            // tambah key id transaksi ke dlm cart
            cart[i].id_transaksi = resultTransaksi.insertId

            // eksekusi simpan cart ke detail trsnski
            await detailModel.add(cart[i])
        }

        // hapus cartnya
        request.session.cart = []

        // direct ke form transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function untk menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        // ambil dadta transaksi
        let transaksi = await transaksiModel.findAll()

        // sisipkan data detail dari setiap transaksi
        for (let i = 0; i < transaksi.length; i++) {
            // ambil id transaksi
            let id = transaksi[i].id

            // ambil data detail sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi: id})

            // sisipkan detail ke transaksinya
            transaksi[i].detail = detail
        }

        // prepare data yg akan dikirimkan ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// funtion untk menghapus data transaksi
exports.hapusTransaksi = async (request,response) => {
    try {
        // menampung data id yg akan dihapus
        let id = request.params.id

        // proses menghapus detail transaksi
        await detailModel.delete({id_transaksi: id})

        // menghapus data transaksi
        await transaksiModel.delete({id: id})

        // redirect ke transaksi
        return response.redirect(`/transaksi`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}