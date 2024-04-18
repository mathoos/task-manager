import React from 'react';
import "./Header.scss";

function Header() {
    return (
        <div className="header">
            <h1>Nom du projet</h1>
            <div className="header_txt">
                <p>Nom du client</p>
                <p>Demandé pour le </p>
            </div>
            
        </div>
    );
}

export default Header;