const { client } = require( "./dbConnection" ) ;


async function getTodosByList( event, listId ){
    try {
        const res = await client.query(
            'SELECT * FROM todo WHERE list = $1::integer;', 
            [ listId ]
        )
        return res.rows
    } catch (err) {
        return err;
    }
}


async function insertNewList( event, listName ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'INSERT INTO list(name) VALUES($1) RETURNING id',
            [ listName ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    }
}

module.exports = { getTodosByList, insertNewList }