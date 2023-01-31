/** panggil express */
const express = require(`express`)

/** buat object 'app' */
const app = express()

/** minta izin untuk membaca data yg dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/** panggil controller customer */
const apotekerController = require(`../controllers/apoteker.controller`)

// load auth from middleware
const authorization = require(`../middleware/authorization`)

/** define route utk akses data customer */
app.get(`/`,authorization.cekUser, apotekerController.showDataApoteker)

/** define route utk nampilin form customer */
app.get(`/add`,authorization.cekUser, apotekerController.showTambahApoteker)

/** define route utk memproses tambah data customer */
app.post(`/add`,authorization.cekUser, apotekerController.prosesTambahData)

// define route untk nampilin form cust dengan data yg akan di ubah
app.get(`/edit/:id`,authorization.cekUser, apotekerController.showEditApoteker)

// define route untk memproses perubahan data
app.post(`/edit/:id`,authorization.cekUser, apotekerController.prosesUbahData)

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, apotekerController.processDelete)

/** export object app */
module.exports = app
