import React, { useState , useEffect } from 'react';
import { tagData } from '../utilities/Tags';
import { personPhotos } from "../data/equipe"
import "./Form.scss";

const Form = ({ containerType, onSubmit, formActive, onClose, editingNote }) => {

    const initialFormData = {
        id: Date.now(),
        title: '',
        description: '',
        tag: '',
        date: '',
        people: []
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (editingNote) {
            setFormData(editingNote);
        } else {
            setFormData(initialFormData);
        }
    }, [editingNote]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePeopleSelection = (personName) => {
        const updatedPeople = formData.people.includes(personName) ? formData.people.filter(p => p !== personName) : [...formData.people, personName];
        setFormData({
            ...formData,
            people: updatedPeople
        });
    };

    const handleAddNote = (event) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({ ...initialFormData, id: Date.now() });
    };

    return (
        <div className={`form ${containerType} ${formActive ? 'active' : ''}`}>

            <button className="form_close" onClick={onClose}>
                <div className="form_close-barre form_close-barre--1"></div>
                <div className="form_close-barre form_close-barre--2"></div>
            </button>

            <form className="form_content" onSubmit={handleAddNote}>

                <div className="form_content-left">

                    <fieldset className="fieldset">
                        <input
                            className="input"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <textarea
                            className="input input_textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <select className="input" name="tag" value={formData.tag} onChange={handleInputChange}>
                            <option value="">Select Tag</option>
                            {Object.keys(tagData).map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <input className="input" type="date" name="date" value={formData.date} onChange={handleInputChange} />
                    </fieldset>

                    <fieldset className="fieldset fieldset_people">
                        {personPhotos.map(person => (
                            <div
                                key={person.name}
                                className={`bouton bouton_people ${formData.people.includes(person.name) ? 'selected' : ''}`}
                                onClick={() => handlePeopleSelection(person.name)}
                            >
                                {person.name}
                            </div>
                        ))}
                    </fieldset>
                </div>

                <div className="form_content-right">
                    <div className="form_content-right--close">
                    <button 
                        className="closeButton" 
                        onClick={(event) => {
                            event.preventDefault();  // Empêche l'exécution du onSubmit du form
                            event.stopPropagation(); // Empêche la propagation de l'événement
                            onClose();
                        }}
                    ></button>
                    </div>
                    <div className="form_content-right--links">         
                        <button className="bouton" type="submit">
                            Valider
                            <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_83_529)">
                                    <path d="M24.4755 5.88168C25.173 6.57922 25.173 7.71204 24.4755 8.40958L10.1898 22.6953C9.49222 23.3928 8.35941 23.3928 7.66187 22.6953L0.519008 15.5524C-0.178537 14.8549 -0.178537 13.7221 0.519008 13.0245C1.21655 12.327 2.34937 12.327 3.04691 13.0245L8.92861 18.9007L21.9532 5.88168C22.6507 5.18413 23.7835 5.18413 24.4811 5.88168H24.4755Z" fill="#54194A"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_83_529">
                                        <rect width="25" height="28.5714" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
