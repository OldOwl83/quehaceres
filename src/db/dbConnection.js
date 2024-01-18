
const { Client } = require( 'pg' );
require('dotenv').config();


const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

client.connect();

module.exports = { client };