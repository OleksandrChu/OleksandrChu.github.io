const todoForm = document.forms["todo-form"];

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(todoForm);
    const task = new Task(Object.fromEntries(formData.entries()));
    task.listId = currentList.id;
    console.log(task)
    createTask(task)
        .then(resp => {
            appendTask(resp)
            currentList.tasks.push(resp);
            todoForm.reset();
        });
});