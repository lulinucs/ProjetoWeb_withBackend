import './Card.css'
import './Button.css'
import React from 'react'

export default props =>

    <div className="Card">
        <div className="Header">
            {props.nome} - {props.setor}
        </div>

        <div className="Conteudo">
            {props.data} às {props.hora}
            <br/><br/>
            {props.children}
            <br/><br/>
            Carga horária: {props.cargahoraria}
            <br/><br/>
            Remuneração: {props.remuneracao}
            {props.vagas}
            
        </div>
        
        <div className="Footer">
            <button>Candidatar-se</button>
            <button>Ver candidatos</button>
        </div>

    </div>