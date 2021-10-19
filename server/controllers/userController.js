const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.view = (req, res) => {
    

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('SELECT * FROM driver', (err, rows) => {

            connection.release();

            if(!err) {
                res.render('driver_table', {rows});
            }else{
                console.log(err);
            }
        })

    })

}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        let searchTerm = req.body.search

        connection.query('SELECT * FROM taxi where model_no LIKE ?', ['%'+ seatchTerm + '%'], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('taxi_table', { rows });
            } else {
                console.log(err);
            }
        })

    })
}

exports.form = (req, res) => {
    res.render('add-driver');
}

exports.create = (req, res) => {
    // res.render('add-driver');
    let {first_name, last_name,age, phone, email, street, state, pincode} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);


        connection.query('INSERT into driver SET f_name = ?, l_name = ?, age = ?, phone = ?, email = ?, street = ?, state=?, pincode = ?', [first_name, last_name, age, phone, email, street , state, pincode], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('add-driver', { alert: 'Driver added Successfully' });
            } else {
                console.log(err);
            }
        })

    })
}

exports.driveredit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('SELECT * FROM driver WHERE driver_id = ?', [req.params.id], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('driver-update', { rows });
            } else {
                console.log(err);
            }
        })

    })

}


exports.driverupd = (req, res) => {
    let { first_name, last_name, age, phone, email, street, state, pincode } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('UPDATE driver SET f_name = ?, l_name = ?, age = ?, phone = ?, email = ?, street = ?, state=?, pincode = ? WHERE driver_id = ?', [first_name, last_name, age, phone, email, street, state, pincode, req.params.id], (err, rows) => {

            connection.release();

            if (!err) {
                
                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    console.log("Connected as connection id " + connection.threadId);

                    connection.query('SELECT * FROM driver WHERE driver_id = ?', [req.params.id], (err, rows) => {

                        connection.release();

                        if (!err) {
                            res.render('driver-update', { rows, alert: 'Driver data updated!' });
                        } else {
                            console.log(err);
                        }
                    })

                })

            } else {
                console.log(err);
            }
        })

    })

}

