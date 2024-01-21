
import { 
    json, useLoaderData, useOutletContext, useParams, useRouteLoaderData 
} from "react-router-dom";

import './list.scss';
import ListNameInput from "../../components/ListNameInput";
import TodoInput from "../../components/TodoInput";
import TodoViewer from "../../components/TodoViewer";


export async function loader({ params }) {
    if( params.listId === 'Favoritos' ) {
        const favouriteTodos = await window.dbApi.getFavouriteTodos()
            .then( res => res )
            .catch( err => { throw( err ) });
    
        return json( favouriteTodos );
    } else {
        const listTodos = await window.dbApi.getTodosByList( params.listId )
            .then( res => res )
            .catch( err => { throw( err ) });
    
        return json( listTodos );
    }
}


export default function ListScreen() {
    const { listId } = useParams();
    const lists = useRouteLoaderData( 'root' );
    const activeList = lists.find( 
        l => l.id === Number( listId ) ) || { id: false, name: listId }

    const todos = useLoaderData();
    const hiddenDones = useOutletContext();


    return (
        <>
        <div id="list-viewer">
            <ListNameInput 
                key={ activeList.name } 
                activeList={ activeList } 
            />
            <div id="todo-displayer">
            {
                todos.filter( todo => !(hiddenDones && todo.done) ).toSorted(
                    ( t1, t2 ) => t2.id - t1.id ).map( 
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