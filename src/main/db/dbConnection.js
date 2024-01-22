
import { Client } from 'pg';


const client = new Client({
    host: import.meta.env.MAIN_VITE_DB_HOST,
    port: import.meta.env.MAIN_VITE_DB_PORT,
    database: import.meta.env.MAIN_VITE_DATABASE,
    user: import.meta.env.MAIN_VITE_DB_USER,
    password: import.meta.env.MAIN_VITE_DB_PASS
})

client.connect();

export { client };
