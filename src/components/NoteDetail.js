import React from 'react';
import { tagData } from '../utilities/Tags';
import "./NoteDetail.scss";

const NoteDetail = ({ note, containerType, personPhotos, onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete(note.id);
        onClose();
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = String(dateObj.getDate()).padStart(2, '0'); // Ajoute un zéro au début si nécessaire
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const today = new Date();
        const currentYear = today.getFullYear();
        const year = dateObj.getFullYear() === currentYear ? '' : `/${dateObj.getFullYear()}`;
        return `${day}/${month}${year}`;
    };

    const containerClass = containerType ? containerType.toLowerCase() : '';

    return (
        <div className={`noteDetail ${containerClass}`}>
            <div className="noteDetail_container">

                <div className="noteDetail_container-left">

                    <div className="txt">
                        <h3>{note.title}</h3>
                        {note.description && note.description.split('\n').map((line, index) => (
                            <p key={index} className="description">{line}</p>
                        ))}
                        <p className="date">{formatDate(note.date)}</p>
                    </div>
   

                    <div className="bottom">
                        <div className="equipe">
                            {note.people.map(person => (
                                <img key={person} src={personPhotos[person]} alt={person} />
                            ))}
                        </div>
                        <p className={`tag ${tagData[note.tag]?.class || 'default'}`}>
                            {note.tag}
                        </p>
                    </div>
                    
                </div>

                <div className="noteDetail_container-right">
                    <div className="noteDetail_container-right--close">
                        <button className="closeButton" onClick={onClose}></button>
                    </div>
                    <div className="noteDetail_container-right--links">         
                        <button className="bouton duplicate">
                            Dupliquer
                            <svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_244_728" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="700">
                                    <rect width="700" height="700" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_244_728)">
                                    <path d="M585.938 150H239.062C189.875 150 150 189.875 150 239.062V585.938C150 635.125 189.875 675 239.062 675H585.938C635.125 675 675 635.125 675 585.938V239.062C675 189.875 635.125 150 585.938 150Z" stroke="black" stroke-width="50" stroke-linejoin="round"/>
                                    <path d="M549.219 150L550 112.5C549.934 89.3138 540.694 67.0962 524.299 50.701C507.904 34.3059 485.686 25.066 462.5 25H125C98.5024 25.0783 73.1125 35.6392 54.3758 54.3758C35.6392 73.1125 25.0783 98.5024 25 125V462.5C25.066 485.686 34.3059 507.904 50.701 524.299C67.0962 540.694 89.3138 549.934 112.5 550H150" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M412.5 287.5V537.5" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M537.5 412.5H287.5" stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </button>
                        <button className="bouton update">
                            Modifier
                            <svg width="700" height="701" viewBox="0 0 700 701" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M496.409 25.6627L430.165 91.9066L608.093 269.835L674.337 203.591C708.554 169.374 708.554 113.942 674.337 79.7254L620.411 25.6627C586.195 -8.55423 530.763 -8.55423 496.546 25.6627H496.409ZM399.233 122.839L80.1949 442.014C65.9607 456.248 55.5588 473.904 49.8103 493.202L1.35919 657.854C-2.0625 669.488 1.08546 681.943 9.57125 690.429C18.057 698.915 30.512 702.062 42.0089 698.778L206.661 650.327C225.959 644.578 243.615 634.176 257.849 619.942L577.161 300.767L399.233 122.839Z" fill="#636363"/>
                            </svg>
                        </button>
                        <button className="bouton delete" onClick={handleDelete}>
                            Supprimer
                            <svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_245_741"  maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="700">
                                    <rect width="700" height="700" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_245_741)">
                                    <path d="M150.232 666.243C151.022 685.11 166.548 700 185.429 700H514.299C533.18 700 548.706 685.11 549.496 666.243L572.981 170.454H126.747L150.232 666.243ZM424.258 293.599C424.258 285.699 430.664 279.292 438.567 279.292H461.453C469.351 279.292 475.762 285.698 475.762 293.599V576.855C475.762 584.757 469.356 591.162 461.453 591.162H438.567C430.667 591.162 424.258 584.76 424.258 576.855V293.599ZM324.114 293.599C324.114 285.699 330.519 279.292 338.421 279.292H361.307C369.205 279.292 375.614 285.698 375.614 293.599V576.855C375.614 584.757 369.21 591.162 361.307 591.162H338.421C330.521 591.162 324.114 584.76 324.114 576.855V293.599ZM223.966 293.599C223.966 285.699 230.371 279.292 238.273 279.292H261.161C269.061 279.292 275.468 285.698 275.468 293.599V576.855C275.468 584.757 269.062 591.162 261.161 591.162H238.273C230.373 591.162 223.966 584.76 223.966 576.855V293.599Z" fill="black"/>
                                    <path d="M588.619 36.0605H436.9V7.3773C436.9 3.30393 433.598 0 429.523 0H270.202C266.129 0 262.827 3.30393 262.827 7.3773V36.0588H111.106C98.8964 36.0588 89 45.9569 89 58.1667V127.616H610.725V58.1684C610.725 45.9586 600.828 36.0605 588.619 36.0605Z" fill="black"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetail;