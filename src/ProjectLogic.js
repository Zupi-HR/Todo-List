import { taskManager } from "./TaskProjectCreator";


class ProjectManager {
    constructor() {
        this.projects = this.getProjects() || [];
    }
    addProject(projectName) {
        const newProject = new ProjectItem(projectName);
        this.projects.push(newProject);
        this.refreshProjectIDs();
        localStorage.setItem("projects", JSON.stringify(this.projects));
        return this.getProjects();
    }

    updateProjectName(id, newName) {
        this.projects = this.getProjects();
        if (this.projects[id]) {
            const tasksToUpdate = taskManager.getAllTasks();
            tasksToUpdate.map((task) => {
                if (task.belongsTo == this.projects[id].name) {
                     task.belongsTo = newName;
                }
            })
            localStorage.setItem('tasks', JSON.stringify(tasksToUpdate));
            console.log(this.projects[id].name, "exist");
            this.projects[id].name = newName;
            localStorage.setItem('projects', JSON.stringify(this.projects));
        } else {
            console.error(`Project with ID: ${id} not found`);
        }

    }

    removeProjectById(id, belongsTo) {
        this.projects = this.getProjects();
        if (this.projects[id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.projects.splice(id, 1);
            taskManager.deleteAllTasksInTodo(belongsTo);
            this.refreshProjectIDs();
            localStorage.setItem("projects", JSON.stringify(this.projects));
        } else {
            console.error(`Todo with ID: ${id} not found.`);
        }
    }

    getProjects() {
        console.log(JSON.parse(localStorage.getItem('projects')));
        return JSON.parse(localStorage.getItem('projects')) || [];
    }

    refreshProjectIDs() {
        this.projects = this.projects.map((item, index) => (item.id = index, item));
    }

}


class ProjectItem {
    constructor(name) {
        this.id;
        this.name = name;
    }
}

const projectManager = new ProjectManager();
export { projectManager };



