/*
let todos = [];

export class RenameProject {
    static rename(id, newName) {
        todos[id].name = newName;
    }
}

export class DeleteProject {
    static delete(id) {
        console.log(`ID of item that will be deleted: ${todos[id].id}`);
        todos.splice(id, 1);
        todos = updateTodoIDs(todos);
    }
}

export class GetProjects {
    static getProjects() {
        return todos;
    }
}

function updateTodoIDs(todos) {
    return todos.map((item, index) => (item.id = index, item));
}

function createTodos(inputValue) {
    class TodoProject {
        constructor(name) {
            this.name = name;
        }
    }
    todos.push(new TodoProject(inputValue));
    todos = updateTodoIDs(todos);
    return todos;
}

*/

class TodoManager {
    constructor() {
        this.todos = [];
    }
    createTodo(name) {
        const newTodo = new TodoProject(name);
        this.todos.push(newTodo);
        this.updateTodoIDs();
        return this.todos;
    }

    renameTodoById(id, newName) {
        if (this.todos[id]) {
            this.todos[id].name = newName;
            console.log(this.todos[id].name, "exist");
        } else {
            console.error(`Todo with ID: ${id} not found`);
        }

    }

    deleteTodoById(id) {
        if (this.todos[id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.todos.splice(id, 1);
            this.updateTodoIDs();
        } else {
            console.error(`Todo with ID: ${id} not found.`);
        }
    }

    getTodos() {
        return this.todos;
    }

    updateTodoIDs() {
        this.todos = this.todos.map((item, index) => (item.id = index, item));
    }

}


class TodoProject {
    constructor(name) {
        this.id;
        this.name = name;
    }
}

const todoManager = new TodoManager();

export { todoManager };




