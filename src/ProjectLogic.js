import { taskManager } from "./TaskProjectCreator";


class ProjectManager {
    constructor() {
        this.projects = [];
    }
    addProject(projectName) {
        const newProject = new ProjectItem(projectName);
        this.projects.push(newProject);
        this.refreshProjectIDs();

        return this.projects;
    }

    updateProjectName(id, newName) {
        if (this.projects[id]) {
            const tasksToUpdate = taskManager.getTasks(this.projects[id].name);
             tasksToUpdate.map((task) => {
                task.belongsTo = newName;
             })
            this.projects[id].name = newName;
            console.log(this.projects[id].name, "exist");
        } else {
            console.error(`Project with ID: ${id} not found`);
        }

    }

    populateLocalStorage(projects) {
        
    } 

    removeProjectById(id, belongsTo) {
        if (this.projects[id]) {
            console.log(`ID of item that will be deleted ${id}`);
            this.projects.splice(id, 1);
            taskManager.deleteAllTasksInTodo(belongsTo);
            this.refreshProjectIDs();
        } else {
            console.error(`Todo with ID: ${id} not found.`);
        }
    }

    getProjects() {
        return this.projects;
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



