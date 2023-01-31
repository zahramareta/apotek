/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// load session
const session = require(`express-session`)

// session config
app.use(session({
    secret: `i love javascript`,
    resave: false,
    saveUninitialized: false
}))

/** load routes */
const obat = require(`./routes/obat.route`)
const customer = require(`./routes/customer.route`)
const apoteker = require(`./routes/apoteker.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route obat */
app.use(`/obat`, obat)

// define prefix for cust
app.use(`/pelanggan`, customer)

// define prefix for apoteker
app.use(`/apoteker`, apoteker)

// define prefix for auth
app.use(`/auth`, auth)

// define prefix for transaksi
app.use(`/transaksi`, transaksi)

// define prefix for auth
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})
