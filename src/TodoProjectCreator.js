const todos = [];

function createTodos(inputValue) {

    class TodoProject {
        constructor(name) {
            this.id = todos.length + 1 - 1;
            this.name = name;
        }
        rename(name) {
            this.name = name;
        }
    }

    todos.push(new TodoProject(inputValue));
    console.log(todos);
    return todos;
}



export default createTodos;

