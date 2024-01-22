
import { useState } from "react";
import { useFetcher } from "react-router-dom";


export default function NewListNameInput() {
    const fetcher = useFetcher();

    const defaultLegend = 'Nueva lista';

    const [ listInput, setListInput ] = useState({
        name: defaultLegend,
        editable: false
    });


    function handleListInsert( e ) {
        fetcher.submit(
            {
                listName: e.target.value,
            }, 
            {
                method: 'post',
                action: '/insert-list',
                encType: "application/x-www-form-urlencoded",
            }
        )
    }


    return (
        listInput.editable ?
        <label id="new-list-name-input" htmlFor="new-list-input">
            <span 
                className="material-symbols-rounded"
            >add</span>
            <input
                id="new-list-input"
                type="text"
                autoFocus
                value={ listInput.name }
                onChange={ 
                    e => {
                        setListInput({
                            ...listInput,
                            name: e.target.value
                        })
                    }
                }
                onKeyDown={ e => {
                    if( e.key === 'Enter' ) {
                        handleListInsert( e )
                        e.target.blur()
                    } else if( e.key === 'Escape' ) e.target.blur();
                }}
                onFocus={ e => e.target.setSelectionRange(
                    0, e.target.value.length ) }
                onBlur={ () => setListInput({
                    name: defaultLegend,
                    editable: false
                })}
            />
        </label> :
        <p
            onClick={ () => setListInput({ 
                ...listInput, 
                editable: true }) }
        ><span className="material-symbols-rounded">add</span>{ defaultLegend }</p>
    )
}