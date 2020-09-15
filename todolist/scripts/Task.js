class Task {
    constructor(titleOrObject, done, listId) {
        this.name = (typeof titleOrObject === 'object') ? titleOrObject.title : titleOrObject;
        this.done = (done === undefined) ? false : done;
        this.listId = listId;
    }
}