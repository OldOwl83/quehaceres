

export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.insertNewList( formData.get( 'listName' ) );
    console.log( res )
    return null;
}