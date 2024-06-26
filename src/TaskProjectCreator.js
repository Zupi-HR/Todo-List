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

    editTask() {

    }

    deleteTaskById(id) {
        if(this.tasks[id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.tasks.splice(id, 1);
            this.updateTaskIDs();
        } else {
            console.error(`Task with ID: ${id} not found`);
        }
    }

    getTasks(position) {
        //this.updateTaskIDs();
        return this.tasks[position];
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