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
            this.id;
            this.name = name;
        }
    }
    todos.push(new TodoProject(inputValue));
    todos = updateTodoIDs(todos);
    return todos;
}

class TodoManager {
    constructor() {
        this.todos = [];
    }
   createTodo() {
    const newTodo = new TodoProject()
   }
    
}
 

class TodoProject {
    constructor(name) {
        this.id;
        this.name = name;
    }
}

export default createTodos;

