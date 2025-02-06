require('dotenv').config();
const mysql2            =   require('mysql2');

const connection    =   mysql2.createConnection({
    host:   process.env.DE_HOST,
    user:   process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_NAME
});

module.exports  =   connection;