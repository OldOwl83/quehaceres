import { NavLink, Outlet, json, useLoaderData } from "react-router-dom";

import './base.scss';


export async function loader() {
    const lists = await window.dbApi.getAllLists()
        .then( res => res )
        .catch( err => { throw( err ) });

    return json( lists );
}

export default function GralLayout() {
    const lists = useLoaderData();

    return (
        <>
        <header>
            <h1>Quehaceres</h1>
            <span 
                className="material-symbols-outlined"
                onClick={ window.winHandlers.exit }
            >close_small</span>
        </header>
        <div id="main-container">
            <aside id="side-bar">
            {
                lists.map( list => <NavLink key={ list.id } to={ list.id.toString() } >
                    { list.name }
                </NavLink>)
            }
            </aside>
            <div id="todo-container">
                <Outlet />
            </div>
        </div>
        </>
    )
}