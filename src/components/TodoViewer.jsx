
import { useFetcher } from "react-router-dom"
import TodoDescrInput from "./TodoDescrInput";


export default function TodoViewer({ todo }) {
    const fetcher = useFetcher();


    function handleTodoUpdate( field, value ) {
        fetcher.submit(
            {
                ...todo,
                [ field ]: value
            }, 
            {
                method: 'post',
                action: '/update-todo',
                encType: "application/x-www-form-urlencoded",
            }
        )
    }


    function handleTodoDelete( todoId ) {
        fetcher.submit(
            { todoId }, 
            {
                method: 'post',
                action: '/delete-todo',
                encType: "application/x-www-form-urlencoded",
            }
        )
    }


    return (
        <div className="todo-viewer">
            <input
                type="checkbox"
                checked={ todo.done }
                onChange={ e => handleTodoUpdate( "done", e.target.checked ) }
            />
            <TodoDescrInput
                key={ todo.description }
                todo={ todo }
                handleTodoUpdate={ handleTodoUpdate }
            />
            <span
                className={ "material-symbols-rounded star" + ( todo.favourite ? " fav" : "") }
                onClick={ () => handleTodoUpdate( "favourite", !todo.favourite )}
            >family_star</span>
            <span
                className={ "material-symbols-rounded delete" }
                onClick={ () => handleTodoDelete( todo.id )}
            >delete</span>
        </div>
    )
}