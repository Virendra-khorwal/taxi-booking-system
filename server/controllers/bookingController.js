const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.form = (req, res) => {
    res.render('booking');
}

exports.check = (req, res) => {
    let { username, password } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected as connection id " + connection.threadId);

        if (username == 'booking' && password == '12345') {
            res.render('booking_form');
            
        } else {
            console.log(err);
        }

    })
}

exports.create = (req, res) => {
    // res.render('add-driver');
    let { first_name, last_name, phone, email, street, city, district, state, pincode,taxi_id, starting_date, ending_date, start_time, end_time,amount, discount, taxi_model } = req.body;
  
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected connection id " + connection.threadId);


        connection.query('INSERT into customer SET f_name = ?, l_name = ?, contact_no = ?, email = ?, street = ?, state=?, pincode = ?, taxi_id=?', [first_name, last_name, phone, email, street + ', ' + city + ', ' + district, state, pincode, taxi_id ], (err, rows) => {

            connection.release();

            if (!err) {
                res.render('booking_form', { alert: 'Taxi Successfully Booked' });
            } else {
                console.log(err);
            }
        })

    })
}
