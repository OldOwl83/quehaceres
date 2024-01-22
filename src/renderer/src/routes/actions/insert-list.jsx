import { redirect } from "react-router-dom";


export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.insertNewList( formData.get( 'listName' ) );
    
    return redirect( `/${ res.toString() }` );
}