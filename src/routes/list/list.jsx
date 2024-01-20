
import { useState } from "react";
import { json, useFetcher, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";

import './list.scss';
import ListNameInput from "../../components/ListNameInput";
import TodoInput from "../../components/TodoInput";
import TodoViewer from "../../components/TodoViewer";


export async function loader({ params }) {
    const listTodos = await window.dbApi.getTodosByList( params.listId )
        .then( res => res )
        .catch( err => { throw( err ) });

    return json( listTodos );
}


export default function ListScreen() {
    const { listId } = useParams();
    const lists = useRouteLoaderData( 'root' );
    const activeList = lists.find( l => l.id === Number( listId ) )

    const todos = useLoaderData();


    return (
        <>
        <div id="list-viewer">
            <ListNameInput 
                key={ activeList.name } 
                activeList={ activeList } 
            />
            <div id="todo-displayer">
            {
                todos.toSorted(( t1, t2 ) => t2.id - t1.id ).map( 
                    todo => <TodoViewer key={ todo.id } todo={ todo } /> )
            }
            </div>
        </div>
        <div id="todo-input-container">
            <TodoInput currentListId={ listId }/>
        </div>
        </>
    )
}