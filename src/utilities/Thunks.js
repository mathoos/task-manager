import { addProject, addNote } from "./SliceProjects";

export const loadProjectsFromLocalStorage = () => (dispatch) => {
    const projectsFromLocalStorage = localStorage.getItem('projects');

    if (projectsFromLocalStorage) {
        try {
            const parsedProjects = JSON.parse(projectsFromLocalStorage);
            if (Array.isArray(parsedProjects)) {
                parsedProjects.forEach(project => {
                    dispatch(addProject(project));
                    project.notes.forEach(note => {
                        dispatch(addNote({ projectId: project.id, note }));
                    });
                });
            }
        } catch (error) {
            console.error('Error parsing projects from localStorage:', error);
        }
    }
};