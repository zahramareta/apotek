/** function untuk CRUD */

/** load dulu connection dari config */
const connection = require(`../config`)

/** function untuk ambil data customer */
exports.ambilDataApoteker = () => {
    return new Promise((resolve, rejected) => {
        /** bikin query untuk ambil data */
        let query = `select * from apoteker`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
} 

/** function untuk ambil data berdasarkan parameter khusus */
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise ((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from apoteker where ${params}`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function utk menambah data customer baru  */
exports.tambahApoteker = (apoteker) => {
    return new Promise((resolve, rejected) => {
        /** ambil key dari object customer */
        let key = Object
        .keys(apoteker) // [key1,key2,dst]
        .join() // "key1,key2,dst"

        /** ambil value dari object customer */
        let value = Object
        .keys(apoteker) // [key1,key2,dst]
        .map(item => `"${apoteker[item]}"`) // untuk scanning, ["value1","value2",dst]
        .join() // `"values1","value2",dst`

        let query = `insert into apoteker (${key}) values (${value})`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi unt update data cust
exports.ubahApoteker = (data, parameter) => {
    return new Promise((resolve, reject) => {
        let perubahanData = Object
        .keys(data)
        .map(item => `${item}="${data[item]}"`)
        .join()

        // menyusun string untk query bagian penentu data yg akan diubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        // susun query
        let query = `update apoteker set ${perubahanData} where ${params}`
        connection.query(query, (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// buat fungsi unt hapus data customer
exports.hapusApoteker = (parameter) => {
    return new Promise((resolve, rejected) => {
        /** -----------------------------------------
         * parameter contain data like this:
         * parameter = {
         *      id: '1'
         * }
         * 
         * to create Query for update data, we have to
         * arrange every key and its value of parameter
         * to be string
         * ----------------------------------------------
         */

        /** ----------------------------------------------
         * arrange list of parameter's keys and its value as string */
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(" and ")
        /** result:
         * params = ' id="1" '
         * ------------------------------------------------
         */

        /** create query for delete */
        let query = `delete from apoteker where ${params}`

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
}