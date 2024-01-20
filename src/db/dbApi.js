const { client } = require( "./dbConnection" ) ;


// Listas
async function getAllLists( event ){
    try {
        const res = await client.query( 'SELECT * FROM list;' );
        return res.rows;
    } catch (err) {
        throw err;
    }
}


async function insertNewList( event, listName ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'INSERT INTO list(name) VALUES($1) RETURNING id;',
            [ listName ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}


async function updateList( event, newListName, listId ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'UPDATE list SET name = $1::text WHERE id = $2::integer RETURNING id;',
            [ newListName, listId ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}


async function deleteList( event, listId ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'DELETE FROM list WHERE id = $1::integer RETURNING id;',
            [ listId ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}


// Todos
async function getTodosByList( event, listId ){
    try {
        const res = await client.query(
            'SELECT * FROM todo WHERE list = $1::integer;', 
            [ listId ]
        )
        return res.rows
    } catch (err) {
        throw err;
    }
}


async function insertNewTodo( event, todoDescr, listId ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'INSERT INTO todo(description, list) VALUES($1::text, $2::integer) RETURNING id',
            [ todoDescr, listId ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}


async function updateTodo( event, todoDescr, todoFavor, todoDone, todoId ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'UPDATE todo SET description = $1::text, favourite = $2::boolean, done = $3::boolean WHERE id = $4::integer RETURNING id',
            [ todoDescr, todoFavor, todoDone, todoId ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}


async function deleteTodo( event, todoId ){
    try {
        await client.query('BEGIN')
        
        const res = await client.query(
            'DELETE FROM todo WHERE id = $1::integer RETURNING id',
            [ todoId ]
        )
       
        await client.query('COMMIT')

        return res.rows[0].id

    } catch ( err ) {
        await client.query('ROLLBACK')
        throw err
    }
}

module.exports = { 
    getAllLists, insertNewList, updateList, deleteList,
    getTodosByList, insertNewTodo, updateTodo, deleteTodo
}