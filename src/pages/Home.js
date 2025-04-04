import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProject } from '../utilities/SliceProjects';

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
                            <Link key={project.id} to={`/dashboard/${project.title}`} className="project">
                                {project.title}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="home_container-info">
                    <div className="home_container-info--top">
                        <div className="bloc">
                            <p>Total de tâches : {totalNotes}</p>
                        </div>
                        <div className="bloc"></div>
                    </div>
                    <div className="home_container-info--calendar"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;