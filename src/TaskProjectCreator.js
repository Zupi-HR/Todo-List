class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(name) {
        const newTask = new TaskProject(name);
        this.tasks.push(newTask);
        this.updateTaskIDs();
        return this.tasks;
    }

    editTask() {

    }

    deleteTaskById(id) {
        
    }
}

class TaskProject {
    constructor(name) {
        this.id = id;
        this.name = name;
    }
}