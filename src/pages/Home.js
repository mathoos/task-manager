import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProject, deleteProject } from '../utilities/SliceProjects';

import './Home.scss';

function Home() {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    const generateRandomTitle = () => {
        const randomTitle = `Projet ${Math.floor(Math.random() * 1000)}`;
        const newProject = { id: Date.now(), title: randomTitle };
        dispatch(addProject(newProject));
    };

    const totalNotes = projects.reduce((sum, project) => sum + (project.notes?.length || 0), 0);

    const totalCompletedNotes = projects.reduce((sum, project) => 
        sum + (project.notes?.filter(note => note.isCompleted).length || 0), 0);
    

    return (
        <div className="home">

            <div className="home_container">
                <div className="home_container-projects">
                    <div className="home_container-projects--title">
                        <h1>Tous les projets</h1>
                        <button className="bouton" onClick={generateRandomTitle}>Créer un projet</button>
                    </div>
                    <div className="home_container-projects--content">
                        {projects.map((project) => (
                            <div className="project">
                                <h2>{project.title}</h2>
                                <div className="project_buttons">
                                    <button>
                                        <Link key={project.id} to={`/dashboard/${project.title}`} className="bouton">
                                            Voir
                                        </Link>
                                    </button>
                                    <button 
                                        className="bouton" 
                                        onClick={() => dispatch(deleteProject(project.id))}>
                                            Supprimer
                                    </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home_container-info">
                    <div className="home_container-info--top">
                        <div className="bloc">
                            <p>Total de tâches : {totalNotes}</p>
                        </div>
                        <div className="bloc">
                            <p>Total de tâches complétées : {totalCompletedNotes}</p>
                        </div>
                    </div>
                    <div className="home_container-info--calendar"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;