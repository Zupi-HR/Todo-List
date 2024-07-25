class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(belongsTo, title, details, date) {
        const newTask = new TaskProject(belongsTo, title, details, date);
        this.tasks.push(newTask);
        console.log(this.tasks);
        this.updateTaskIDs();
        return this.getTasks(belongsTo);
    }

    editTask(id, title, details, date) {
     this.tasks[id].title = title;
     this.tasks[id].details = details;
     this.tasks[id].date = date;
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

    deleteAllTasksInTodo(belongs_to) {  
       this.tasks = this.tasks.filter(task => !(task.belongsTo === belongs_to));
    }


    getTasks(belongs_to) {
       // this.updateTaskIDs();
        return this.tasks.filter((task) => task.belongsTo == belongs_to);
    }

    getAllTasks() {
        return this.tasks;
    }

    updateTaskIDs() {
        this.tasks = this.tasks.map((item, index) => (item.id = index, item));
    }
}

class TaskProject {
    constructor(belongsTo, title, details, date) {
        this.belongsTo = belongsTo;
        this.finished = false;
        this.id;
        this.title = title;
        this.details = details;
        this.date = date;
        this.important = false;
    }
}

const taskManager = new TaskManager();

export {taskManager};