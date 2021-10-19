const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.form = (req, res) => {
    res.render('admin');
}

exports.check = (req, res) => {
    let { username, password } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        if (username == 'admin' && password== '12345') {
            res.render('admin-page');

            
        } else {
            console.log(err);
        }

    })
}

exports.viewCus = (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('SELECT * FROM customer', (err, rows) => {

            connection.release();

            if (!err) {
                res.render('customer_table', { rows });
            } else {
                console.log(err);
            }
        })

    })
}

exports.viewDriv = (req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('SELECT * FROM driver', (err, rows) => {

            connection.release();

            if (!err) {
                res.render('driver_table', { rows });
            } else {
                console.log(err);
            }
        })

    })

}

exports.viewFdk = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        connection.query('SELECT * FROM feedback', (err, rows) => {

            connection.release();

            if (!err) {
                res.render('feedback_table', { rows });
            } else {
                console.log(err);
            }
        })

    })

}




