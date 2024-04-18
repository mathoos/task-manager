import React from 'react';
import "./Header.scss";

function Header({ setIsFormVisible }) {
    return (
        <div className="header">
            <button className="bouton bouton_add" onClick={() => setIsFormVisible(true)}>Ajouter une note</button>
        </div>
    );
}

export default Header;