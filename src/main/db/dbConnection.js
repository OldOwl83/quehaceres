
import { Client } from 'pg';


const client = new Client({
    host: import.meta.env.MAIN_VITE_DB_HOST,
    port: import.meta.env.MAIN_VITE_DB_PORT,
    database: import.meta.env.MAIN_VITE_DATABASE,
    user: import.meta.env.MAIN_VITE_DB_USER,
    password: import.meta.env.MAIN_VITE_DB_PASS,
    ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
})

try {
    client.connect();
} catch( err ) {
    throw err;
}

export { client };
