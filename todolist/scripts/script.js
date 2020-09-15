const todoBodyElement = document.querySelector("#todo-body");
const todoListsElement = document.querySelector("#todo-lists");
let todoLists = [];
let currentList;

function appendTask(task) {
    todoBodyElement.appendChild(buildTodoItemHtml(task));
}

function appendTasks(tasks) {
    todoBodyElement.innerHTML = "";
    tasks.forEach(appendTask)
}

function appendList(list) {
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-light';
    deleteButton.innerHTML = '&#59213;';
    deleteButton.addEventListener('click', ev => {
        ev.stopPropagation();
        console.log(true);
    })
    li.innerText = list.name;
    li.appendChild(deleteButton);
    li.addEventListener('click', (event) => {
        event.preventDefault();
        onListItemClickEvent(list);
    })
    todoListsElement.appendChild(li);
}

function onListItemClickEvent(list) {
    currentList = list;
    if (list.tasks.length > 0) {
        appendTasks(list.tasks)
    } else {
        todoBodyElement.innerHTML = "";
    }
}

function appendLists() {
    getLists().then(lists => {
        todoLists = lists;
        lists.forEach(appendList);
    });
}

function buildTodoItemHtml(task) {
    let div = document.createElement('div');
    let check = document.createElement('input');
    let title = document.createElement('p');
    let buttonMenuElement = document.createElement('div');
    let editButton = document.createElement('button');
    let removeButton = document.createElement('button');
    div.className = "todo-item";
    check.type = "checkbox";
    check.checked = task.done;
    check.innerText = "Не работает"
    check.addEventListener('click', ev => {
        task.done = !task.done;
        updateTask(task)
            .then(task => setTaskDoneStatusDecoration(task, title));
    })

    title.innerText = task.name;
    setTaskDoneStatusDecoration(task, title);

    buttonMenuElement.className = 'todo-menu';

    editButton.className = 'btn btn-light';
    editButton.id = "todo-edit-button";
    editButton.innerHTML = '&#xE70F;';
    editButton.addEventListener('click', ev => {
        todoBodyElement.replaceChild(buildEditBlock(task), div)
    });

    removeButton.className = 'btn btn-light';
    removeButton.id = "todo-remove-button";
    removeButton.innerHTML = '&#xE74D;';
    removeButton.addEventListener('click', ev => {
        deleteTask(task).then(res => {
            let index = currentList.tasks.indexOf(currentList.tasks.find(el => el.id === task.id));
            currentList.tasks.splice(index, 1);
            appendTasks(currentList.tasks);
        });
    });

    div.appendChild(check);
    div.appendChild(title);
    div.appendChild(buttonMenuElement)
    div.appendChild(editButton)
    div.appendChild(removeButton)

    return div;
}

function buildEditBlock(task) {
    let editContainerElement = document.createElement('div');
    let input = document.createElement('input');
    let applyButton = document.createElement('button');
    let rejectButton = document.createElement('button');
    editContainerElement.className = 'edit-container';
    input.type = 'text';
    input.className = 'form-control';
    input.value = task.name;

    applyButton.className = 'btn btn-success';
    applyButton.textContent = "Edit";
    applyButton.addEventListener('click', ev => {
        if (input.value.trim().length > 0) {
            task.name = input.value.trim();
            updateTask(task).then(task => {
                todoBodyElement.replaceChild(buildTodoItemHtml(task), editContainerElement);
            });
        } else {
            alert("Task name is empty");
        }
    })

    rejectButton.className = 'btn btn-danger';
    rejectButton.textContent = "Reject";
    editContainerElement.appendChild(input);
    editContainerElement.appendChild(applyButton);
    editContainerElement.appendChild(rejectButton);
    return editContainerElement;
}

function setTaskDoneStatusDecoration(task, title) {
    if (task.done) {
        title.className = 'done_task'
    } else {
        title.className = '';
    }
}

function updateTask(task) {
    if (this.value.trim().length > 0) {
        task.name = this.value.trim();
        updateTask(task).then(task => {
            todoBodyElement.replaceChild(buildTodoItemHtml(task), div);
        });
    } else {
        alert("Task name is empty");
    }
}

appendLists();