import { json, useLoaderData, useLocation } from "react-router-dom";

export async function loader({ params }) {
    const listTodos = await window.dbApi.getTodosByList( params.listId )
        .then( res => res )
        .catch( err => { throw( err ) });

    return json( listTodos );
}


export default function ListScreen() {
    const todos = useLoaderData();
    const loc = useLocation();
console.log(todos)
    return (
        <p>{ loc.pathname }</p>
    )
}