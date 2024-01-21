
import { useState } from "react";


export default function TodoDescrInput({ todo, handleTodoUpdate }) {
    const [ textEditable, setTextEditable ] = useState({
        text: todo.description,
        editable: false
    });

    return (
        textEditable.editable ?
        <textarea 
            autoFocus
            rows={ 3 }
            value={ textEditable.text }
            onChange={ e => setTextEditable({
                ...textEditable,
                text: e.target.value
            })}
            onKeyDown={ e => {
                if( e.key === 'Enter' ) {
                    handleTodoUpdate( "description", e.target.value )
                    e.target.blur()
                } else if( e.key === 'Escape' ) e.target.blur();
            }}
            onFocus={ e => e.target.setSelectionRange(
                e.target.value.length, e.target.value.length ) }
            onBlur={ () => setTextEditable({
                text: todo.description,
                editable: false
            })}
        /> :
        <p
            onClick={ () => setTextEditable({ 
                ...textEditable, 
                editable: true }) }
        >{ todo.description }</p>
    )
}