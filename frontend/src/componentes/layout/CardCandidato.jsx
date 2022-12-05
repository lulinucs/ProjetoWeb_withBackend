import './Card.css'
import React from 'react'

export default props =>

    <div className="Card">
        <div className="Header">
            {props.nome} - {props.pronome}
        </div>

        <div className="Conteudo">
            <img className="Img" src="https://i.pinimg.com/736x/3d/cd/4a/3dcd4af5bc9e06d36305984730ab7888.jpg"/>
            <br/><br/>
            Nascimento: {props.nascimento}
            <br/><br/>
            CPF: {props.CPF}
            <br/><br/>
            Telefone: {props.telefone}
            <br/><br/>
            {props.experiencia}
            
        </div>
        
        <div className="Footer">
            <button>Selecionar</button>
        </div>

    </div>