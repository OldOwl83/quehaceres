
export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.updateList(
        formData.get('newListName'), formData.get('listId')
    );

    return null;
}