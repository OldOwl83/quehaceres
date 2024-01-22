
import { useState } from "react";
import { NavLink, Outlet, json, useLoaderData } from "react-router-dom";

import './base.scss';
import logo from './react.svg';
import NewListNameInput from "../../components/NewListNameInput";


export async function loader() {
    const lists = await window.dbApi.getAllLists()
        .then( res => res )
        .catch( err => { throw( err ) });

    return json( lists );
}

export default function GralLayout() {
    const lists = useLoaderData();

    const [ hiddenDones, setHiddenDones ] = useState( true );


    return (
        <>
        <header>
            <img src={ logo } alt="logo"/>
            <h1>Quehaceres</h1>
            <span 
                className="material-symbols-rounded"
                onClick={ window.winHandlers.exit }
            >close_small</span>
        </header>
        <div id="main-container">
            <aside id="side-bar">
                <div id="list-list-container">
                    <h2>Listas</h2>
                {
                    lists.toSorted( ( l1, l2 ) => l2.id - l1.id ).map( 
                        list => <NavLink key={ list.id } to={ list.id.toString() } >
                            { list.name }
                        </NavLink>)
                }
                    <NavLink id="fav-link" to={ 'Favoritos' }><span
                        className={ "material-symbols-rounded star" }
                    >family_star</span>Favoritos</NavLink>
                    <NewListNameInput />
                </div>

                <div id="options">
                    <h2>Opciones</h2>
                    <label htmlFor="hidden-dones">
                        <input 
                            id="hidden-dones"
                            type="checkbox"
                            checked={ hiddenDones }
                            onChange={ e => setHiddenDones( e.target.checked )}
                        />
                        Ocultar hechos
                    </label>
                </div>
            </aside>
            <div id="todo-container">
                <Outlet context={ hiddenDones }/>
            </div>
        </div>
        </>
    )
}