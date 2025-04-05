import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProject, deleteProject } from '../utilities/SliceProjects';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isBefore, isSameDay, parseISO } from 'date-fns';

import './Home.scss';

function Home() {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const generateRandomTitle = () => {
        const randomTitle = `Projet ${Math.floor(Math.random() * 1000)}`;
        const newProject = { id: Date.now(), title: randomTitle };
        dispatch(addProject(newProject));
    };

    const totalNotes = projects.reduce((sum, project) => sum + (project.notes?.length || 0), 0);
    const totalCompletedNotes = projects.reduce((sum, project) =>
        sum + (project.notes?.filter(note => note.isCompleted).length || 0), 0);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsDateSelected(true);
    };

    const selectedNotes = projects.flatMap(project =>
        (project.notes || []).filter(note =>
            note.date && selectedDate && isSameDay(parseISO(note.date), selectedDate)
        )
    );

    const noteDates = projects.flatMap(project =>
        (project.notes || []).map(note => note.date && parseISO(note.date)).filter(Boolean)
    );

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return noteDates.some(noteDate => isSameDay(noteDate, date)) ? 'highlight' : null;
        }
        return null;
    };

    const overdueNotes = projects.flatMap(project =>
        (project.notes || []).filter(note =>
            note.date &&
            isBefore(parseISO(note.date), new Date()) &&
            !note.isCompleted
        )
    );
    

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
                            <div className="project" key={project.id}>
                                <h2>{project.title}</h2>
                                <div className="project_buttons">
                                    <button>
                                        <Link to={`/dashboard/${project.title}`} className="bouton">Voir</Link>
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
                 
                    <div className="bloc">
                        <h2>Total des tâches</h2>
                        <p className="bloc_number">{totalNotes}</p>
                    </div>
                    <div className="bloc">
                        <h2>Tâches complétées</h2>
                        <p className="bloc_number">{totalCompletedNotes}</p>
                    </div>
                
                    
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate || new Date()}
                        tileClassName={tileClassName}
                        className="bloc bloc_calendar"
                    />
                    
                    <div className="bloc">
                        <h2>⚠️ Tâches en retard</h2>
                        {overdueNotes.length === 0 ? (
                            <p>Aucune tâche en retard.</p>
                        ) : (
                            <div className="bloc_late">
                                {overdueNotes.map(note => (
                                    <p key={note.id}>
                                        - {note.title} <em>{format(parseISO(note.date), 'dd/MM/yyyy')}</em>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                   
                </div>

                {isDateSelected && (
                    <div className="home_container-calendar-notes">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Notes du {format(selectedDate, 'dd/MM/yyyy')} :</h3>
                            <button className="bouton" onClick={() => setIsDateSelected(false)}>Fermer</button>
                        </div>
                        {selectedNotes.length === 0 ? (
                            <p>Aucune note prévue ce jour-là.</p>
                        ) : (
                            <ul>
                                {selectedNotes.map(note => (
                                    <li key={note.id}>{note.title}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
