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
        console.log(true)
        // updateTask(task).then(res => {
        //     console.log(res)
        // });
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

function setTaskDoneStatusDecoration(task, title) {
    if (task.done) {
        title.className = 'done_task'
    } else {
        title.className = '';
    }
}

appendLists();