import React, { useState } from 'react';
import { tagData } from '../utilities/Tags';
import { personPhotos } from "../data/equipe"
import "./Form.scss";

const Form = ({ handleSubmit, closeModal, modalActive, setModalActive }) => {
    const initialFormData = {
        title: '',
        description: '',
        tag: '',
        date: '',
        people: []
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleCloseButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
    };

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
        if (formData.title.trim() !== '' && formData.description.trim() !== '' && formData.tag !== '' && formData.date !== '') {
            handleSubmit(formData);
            setFormData(initialFormData);
            setModalActive(false);
        }
    };

    return (
        <div className={`form ${modalActive ? 'active' : ''}`}>
            <button className="form_close" onClick={handleCloseButtonClick}>
                <div className="form_close-barre form_close-barre--1"></div>
                <div className="form_close-barre form_close-barre--2"></div>
            </button>
            <form className="form_content" onSubmit={handleAddNote}>
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
                <button className="bouton" type="submit">
                    Valider
                </button>
            </form>
        </div>
    );
};

export default Form;