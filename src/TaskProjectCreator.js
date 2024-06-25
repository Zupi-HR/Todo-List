class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(title, details, date) {
        const newTask = new TaskProject(title, details, date);
        this.tasks.push(newTask);
        this.updateTaskIDs();
        return this.tasks;
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

    getTasks() {
        return this.tasks;
    }

    updateTaskIDs() {
        this.tasks = this.tasks.map((item, index) => (item.id = index, item));
    }
}

class TaskProject {
    constructor(title, details, date) {
        this.id;
        this.title = title;
        this.details = details;
        this.date = date;
    }
}

const taskManager = new TaskManager();

export {taskManager};