
import { useState } from "react";
import { useFetcher } from "react-router-dom";


export default function TodoInput({ currentListId }) {

    const fetcher = useFetcher();

    const [ todoInput, setTodoInput ] = useState( '' );


    function handleTodoInsert( e ) {
        fetcher.submit(
            {
                todoText: e.target.value,
                listId: currentListId
            }, 
            {
                method: 'post',
                action: '/insert-todo',
                encType: "application/x-www-form-urlencoded",
            }
        )
        setTodoInput( '' );
    }


    return (
        <input
            id="todo-input"
            type="text"
            disabled={ isNaN( Number( currentListId ) ) }
            placeholder="Ingrese nuevo quehacer..."
            value={ todoInput }
            onChange={ e => setTodoInput( e.target.value ) }
            onKeyDown={ e => e.key === 'Enter' && handleTodoInsert( e ) } 
        />
    )
}