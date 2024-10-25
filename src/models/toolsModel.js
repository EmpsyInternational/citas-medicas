const pool = require('../utils/mysql.connect');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken

const SECRET_KEY = process.env.KEY // Define una clave secreta en .env

// Función para hashear la contraseña usando SHA1
const hashPassword = (password) => {
    return crypto.createHash('sha1').update(password).digest('hex');
}

const authentication = async ({ email, password }) => {
    try {
        let msg = {
            status: false,
            message: 'User not found',
            code: 404
        };

        const hashedPassword = hashPassword(password);
        const connection = await pool.getConnection();
        const sql = 'SELECT email FROM users WHERE email = ? AND password = ?';
        const [result] = await connection.execute(sql, [email, hashedPassword]);

        if (result.length > 0) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '2h' }); // 
            msg = {
                status: true,
                message: 'User authenticated successfully',
                code: 200,
                token
            };
        }

        connection.release();
        return msg;
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'Internal server error',
            code: 500
        };
    }
}

const registerUser = async ({ first_name, last_name, email, password, ciudad, telefono }) => {
    try {
        let msg = {
            status: false,
            message: 'Email already exists',
            code: 409
        };

        const hashedPassword = hashPassword(password);
        const connection = await pool.getConnection();
        const sqlCheckEmail = 'SELECT email FROM users WHERE email = ?';
        const [emailCheck] = await connection.execute(sqlCheckEmail, [email]);

        if (emailCheck.length > 0) {
            connection.release();
            return msg;
        }

        const sql = 'INSERT INTO users(first_name, last_name, email, password, ciudad, telefono) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [first_name, last_name, email, hashedPassword, ciudad, telefono]);

        if (result.affectedRows > 0) {
            msg = {
                status: true,
                message: 'User registered successfully',
                code: 201
            };
        }

        connection.release();
        return msg;
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'Internal server error',
            code: 500
        };
    }
}


const getCitas = async () => {
    try {
        let msg = {
            status: false,
            message: 'Citas not found',
            code: 409,
            data: []
        };

        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM citas';
        const [result] = await connection.execute(sql);

        if (result.length > 0) {
            msg = {
                status: true,
                message: 'Citas retrieved successfully',
                code: 200,
                data: result
            };
        }

        connection.release();
        return msg;
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'Internal server error',
            code: 500,
            data: []
        };
    }
}

const getLeads = async () => {
    try {
        let msg = {
            status: false,
            message: 'Leads not found',
            code: 409,
            data: []
        };

        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM leads';
        const [result] = await connection.execute(sql);

        if (result.length > 0) {
            msg = {
                status: true,
                message: 'Leads retrieved successfully',
                code: 200,
                data: result
            };
        }

        connection.release();
        return msg;
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'Internal server error',
            code: 500,
            data: []
        };
    }
}

module.exports = {
    authentication,
    registerUser,
    getCitas,
    getLeads
}
