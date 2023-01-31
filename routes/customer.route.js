/** panggil express */
const express = require(`express`)

/** buat object 'app' */
const app = express()

/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/** panggil controller customer */
const customerController = require(`../controllers/customer.controller`)

// load auth from middleware
const authorization = require(`../middleware/authorization`)

/** define route utk akses data customer */
app.get(`/`,authorization.cekUser, customerController.showDataCustomer)

/** define route utk nampilin form customer */
app.get(`/add`,authorization.cekUser, customerController.showTambahCustomer)

/** define route utk memproses tambah data customer */
app.post(`/add`,authorization.cekUser, customerController.prosesTambahData)

// define route untk nampilin form cust dengan data yg akan di ubah
app.get(`/edit/:id`,authorization.cekUser, customerController.showEditCustomer)

// define route untk memproses perubahan data
app.post(`/edit/:id`,authorization.cekUser, customerController.prosesUbahData)

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, customerController.processDelete)

/** export object app */
module.exports = app

