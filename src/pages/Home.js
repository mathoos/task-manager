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

    return (
        <div className="home">

            <div className="container">
                <div className="container_links">
                    {projects.map((project) => (
                        <Link key={project.id} to={`/dashboard/${project.title}`} className="container_links-link">
                            {project.title}
                        </Link>
                    ))}
                </div>
                <button className="container_button" onClick={generateRandomTitle}>Créer un projet</button>
            </div>
        </div>
    );
}

export default Home;