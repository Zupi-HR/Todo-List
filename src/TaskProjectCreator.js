class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(position, title, details, date) {
        const newTask = new TaskProject(title, details, date);
        if(this.tasks[position] === undefined) {
            this.tasks[position] = [];
        }
        this.tasks[position].push(newTask);
        console.log(this.tasks);
        console.log(this.tasks[position]);
        this.updateTaskIDs(position);
        return this.tasks[position];
    }

    editTask(position, id, title, details, date) {
     this.tasks[position][id].title = title;
     this.tasks[position][id].details = details;
     this.tasks[position][id].date = date;
    }

    deleteTaskById(position, id) {
        if(this.tasks[position][id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.tasks[position].splice(id, 1);
            this.updateTaskIDs(position);
        } else {
            console.error(`Task with ID: ${id} not found`);
        }
    }

    deleteAllTasksInTodo(position) {
        if (this.tasks[position]) {
            console.log(`Task array with a position ${position} will be deleted`);
            this.tasks.splice(position, 1);
            console.log(this.tasks);
        } else {
            console.error(`Task array position ${position} not found`);
        }
    }

    getTasks(position) {
        //this.updateTaskIDs();
        return this.tasks[position];
    }

    getAllTasks() {
        return this.tasks;
    }

    updateTaskIDs(position) {
        this.tasks[position] = this.tasks[position].map((item, index) => (item.id = index, item));
    }
}

class TaskProject {
    constructor(title, details, date) {
        this.belongsTo;
        this.finished = false;
        this.id;
        this.title = title;
        this.details = details;
        this.date = date;
    }
}

const taskManager = new TaskManager();

export {taskManager};