import './Card.css'
import React from 'react'

export default props =>
    <div className="Card">
        <div className="Header">
            {props.titulo}
        </div>
        <div className="Conteudo">
            {props.children}
        </div>
        <div className="Footer">
            
        </div>

    </div>