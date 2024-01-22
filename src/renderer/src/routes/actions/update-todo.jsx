
export async function action({ request }) {
    const formData = await request.formData();
    
    const res = await window.dbApi.updateTodo(
        formData.get('description'), formData.get('favourite'),
        formData.get('done'), formData.get('id')
    );

    return null;
}