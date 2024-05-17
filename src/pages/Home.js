import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProject } from '../utilities/SliceProjects';
import Nav from '../components/Nav';
import './Home.scss';

function Home() {
    const [projects, setProjects] = useState([]);
    const dispatch = useDispatch();

    // Charger les projets depuis le localStorage au chargement de la page
    useEffect(() => {
        const projectsFromLocalStorage = localStorage.getItem('projects');
        if (projectsFromLocalStorage) {
            const parsedProjects = JSON.parse(projectsFromLocalStorage);
            setProjects(parsedProjects);
        }
    }, []);

    // Ajouter un nouveau projet et le sauvegarder dans le localStorage
    const generateRandomTitle = () => {
        const randomTitle = `Projet ${Math.floor(Math.random() * 1000)}`;
        const newProject = { id: Date.now(), title: randomTitle };
        setProjects([...projects, newProject]); // Mettre à jour le state local
        dispatch(addProject(newProject)); // Ajouter le nouveau projet au store
    };

    return (
        <div className="home">
            <Nav />
            <div className="container">
                
                    <div className="container_links">
                        {projects.map((project, index) => (
                            <Link className="container_links-link" key={index} to={`/dashboard/${project.title}`}>
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