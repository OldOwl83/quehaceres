
import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";


export default function ListNameInput({ activeList }) {
    const fetcher = useFetcher();
    const inputRef = useRef(null);

    const [ listInput, setListInput ] = useState({
        name: activeList.name,
        readOnly: true
    });


    function handleListUpdate( e ) {
        fetcher.submit(
            {
                newListName: e.target.value,
                listId: activeList.id
            }, 
            {
                method: 'post',
                action: '/update-list',
                encType: "application/x-www-form-urlencoded",
            }
        )
    }


    function handleListDelete() {
        fetcher.submit(
            {
                listId: activeList.id
            }, 
            {
                method: 'post',
                action: '/delete-list',
                encType: "application/x-www-form-urlencoded",
            }
        )
    }


    return (
        <div id="list-name-input">
            <input
                ref={ inputRef }
                style={{ width: listInput.name.length + 'ch' }}
                type="text"
                readOnly={ listInput.readOnly }
                value={ listInput.name }
                onChange={ 
                    e => {
                        setListInput({
                            ...listInput,
                            name: e.target.value
                        })
                    }
                }
                onKeyDown={ e => (
                    e.key === 'Enter' && handleListUpdate( e ) || (
                    e.key === 'Escape' && e.target.blur() )
                ) }
                onFocus={ e => e.target.setSelectionRange(
                    e.target.value.length, e.target.value.length ) }
                onBlur={ () => setListInput({
                    name: activeList.name,
                    readOnly: true
                })}
            />
            {
                activeList.id &&
                <>
                <span 
                    className="material-symbols-rounded"
                    onClick={ () => {
                        setListInput({
                            ...listInput,
                            readOnly: false
                        })
                        inputRef.current.focus()
                    }}
                >edit</span>
                <span 
                    className="material-symbols-rounded"
                    onClick={ handleListDelete } 
                >delete</span>
                </>
            }
        </div>
    )
}