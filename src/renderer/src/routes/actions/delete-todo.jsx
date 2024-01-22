

export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.deleteTodo(formData.get( 'todoId' ));

    return null;
}