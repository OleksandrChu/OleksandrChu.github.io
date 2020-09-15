let todos = [
    new Task("Buy bread", false),
    new Task("Buy milk", false),
    new Task("Buy bread", true),
    new Task("Buy milk", false),
    new Task("Buy bread", true)
];

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
    li.innerText = list.name;
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
    let buttonMenuElement = document.createElement('div');
    let editButton = document.createElement('button');
    let removeButton = document.createElement('button');
    div.className = "todo-item";
    check.type = "checkbox";
    check.checked = task.done;

    buttonMenuElement.className = 'todo-menu';

    editButton.className = 'btn btn-light';
    editButton.id = "todo-edit-button";
    editButton.innerHTML = '&#xE70F;';
    editButton.addEventListener('click', (ev) => {
        editTask(task);
    });

    removeButton.className = 'btn btn-light';
    removeButton.id = "todo-remove-button";
    removeButton.innerHTML = '&#xE74D;';
    removeButton.addEventListener('click', (ev) => {
        deleteTask(task).then(res => {
            let index = currentList.tasks.indexOf(currentList.tasks.find(el => el.id === task.id));
            console.log(index)
            currentList.tasks.splice(index, 1);
            appendTasks(currentList.tasks);
        });
    });

    div.appendChild(check);
    div.innerHTML += `<p id="todo-text">${task.name}</p>`
    div.appendChild(buttonMenuElement)
    div.appendChild(editButton)
    div.appendChild(removeButton)
    console.log(div)
    return div;
}

appendLists();