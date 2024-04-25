import React, { useState , useEffect } from 'react';
import { tagData } from '../utilities/Tags';
import { personPhotos } from "../data/equipe"
import "./Form.scss";

const Form = ({ handleSubmit, formActive, editingNote, handleClose }) => {

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
        handleSubmit(formData);
        setFormData({ ...initialFormData, id: Date.now() });
    };

    return (
        <div className={`form ${formActive ? 'active' : ''}`}>
            <button className="form_close" onClick={handleClose}>
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
