import React from 'react';
import '../styles/Menus.css';

const Menus = ({ selectedSection, setSelectedSection }) => {
    return (
        <nav className='sub-navbar'>
            <ul className="menu">
                <li 
                    className={selectedSection === "discover" ? "selected" : ""} 
                    onClick={() => setSelectedSection("discover")}
                >
                    Explorar
                </li>
                <li 
                    className={selectedSection === "filmes" ? "selected" : ""} 
                    onClick={() => setSelectedSection("filmes")}
                >
                    Filmes
                </li>
                <li 
                    className={selectedSection === "series" ? "selected" : ""} 
                    onClick={() => setSelectedSection("series")}
                >
                    Series
                </li>
            </ul>
        </nav>
    );
};

export default Menus;
