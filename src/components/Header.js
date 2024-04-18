import React from 'react';

function Header({ setIsFormVisible }) {
    return (
        <div className="container_header">
            <button className="bouton bouton_add" onClick={() => setIsFormVisible(true)}>Ajouter une note</button>
        </div>
    );
}

export default Header;