import { useFetcher } from "react-router-dom"


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


    return (
        <div className="todo-viewer">
            <input
                type="checkbox"
                checked={ todo.done }
                onChange={ e => handleTodoUpdate( "done", e.target.checked ) }
            />
            <p>{ todo.description }</p>
            <span
                className={ "material-symbols-outlined" + ( todo.favourite ? " fav" : "") }
                onClick={ () => handleTodoUpdate( "favourite", !todo.favourite )}
            >star</span>
        </div>
    )
}