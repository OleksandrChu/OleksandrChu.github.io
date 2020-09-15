function getLists() {
    return fetch("http://localhost:5000/api/list/")
        .then(res => res.json())
}

function createTask(task) {
    const options = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch('http://localhost:5000/api/task', options)
        .then(res => res.json());
}

function deleteTask(task) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`http://localhost:5000/api/task/${task.id}`, options);
}

function updateTask(task) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`http://localhost:5000/api/task/${task.id}`, options)
        .then(res => res.json());
}
