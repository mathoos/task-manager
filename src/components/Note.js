const Note = ({ note, tagColors, dateForDay, personPhotos, onClick }) => {
    return (
        <div className={`note ${tagColors[note.tag] || 'default'}`} onClick={onClick}>
            <div className="note_content">
                <div className="note_content-title">
                    <h3>{note.title}</h3>
                    <p>{note.emote}</p>
                </div>
                <p>{note.description}</p>
                <p>{note.time} - {dateForDay}</p>
                <div className="note_content-people">
                    {note.people.map(person => (
                        <img key={person} src={personPhotos[person]} alt={person} />
                    ))}
                </div>
                <div className={`bouton bouton_tag ${tagColors[note.tag] || 'default'}`}>{note.tag}</div>
            </div>
        </div>
    );
};

export default Note;