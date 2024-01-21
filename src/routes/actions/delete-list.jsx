import { redirect } from "react-router-dom";


export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.deleteList( formData.get( 'listId' ) );

    return redirect( '/Favoritos' );
}