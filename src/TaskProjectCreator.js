class TaskManager {
    constructor() {
        this.tasks = this.getAllTasks() || [];
    }

    createTask(belongsTo, title, details, date) {
        const newTask = new TaskProject(belongsTo, title, details, date);
        this.tasks.push(newTask);
        console.log(this.tasks);
        this.updateTaskIDs();
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return this.getTasks(belongsTo);
    }

    editTask(id, title, details, date) {
        this.tasks = this.getAllTasks();
        this.tasks[id].title = title;
        this.tasks[id].details = details;
        this.tasks[id].date = date;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    setTaskFinishedStatus(id, value) {
       this.tasks = this.getAllTasks();
       this.tasks[id].finished = value;
       localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    deleteTaskById(id) {
        this.tasks = this.getAllTasks();
        if (this.tasks[id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.tasks.splice(id, 1);
            this.updateTaskIDs();
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } else {
            console.error(`Task with ID: ${id} not found`);
        }
    }

    updateTaskImportantProperty(id) {
     this.tasks = this.getAllTasks();
     this.tasks[id].important = !this.tasks[id].important;
     localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    deleteAllTasksInTodo(belongs_to) {
        this.tasks = this.getAllTasks();
        this.tasks = this.tasks.filter(task => !(task.belongsTo === belongs_to));
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }


    getTasks(belongs_to) {
        // this.updateTaskIDs();
        this.tasks = this.getAllTasks();
        return this.tasks.filter((task) => task.belongsTo == belongs_to);
    }

    getAllTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
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

export { taskManager };