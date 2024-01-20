
export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.insertNewTodo(
        formData.get('todoText'), formData.get('listId')
    );

    return null;
}