import React from "react";
import './Header.css'

export default ({black}) => {
    return (
        <header className={black ? 'black-header' : ''}>
            <div className='header-logo'>
                <a href='#'>
                    <img src="https://www.caviarcriativo.com/wp-content/uploads/2020/06/Significados-da-Marca-Netflix-1000x480.gif" alt="Logo da Neteflix"/>
                </a>
            </div>
            <div className="header-user">
                <a href='#'>
                    <img src="https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png"/>
                </a>
            </div>
        </header>
    )
}