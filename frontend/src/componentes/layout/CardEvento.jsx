import './Card.css'
import './Button.css'
import React from 'react'
import Axios from "axios";



function CandidatarSe(nomeEvento, googleId) {
    Axios.post("http://localhost:8081/candidatarse", {
        nomeEvento: nomeEvento,
        googleId: googleId
    }).then((response) => {
        console.log("resposta:" + response);


    })
};

export default props =>

    <div className="Card">
        <div className="Header">
            {props.nomeEvento} - {props.setor}
        </div>

        <div className="Conteudo">
            {props.data} às {props.horario}
            <br/><br/>
            {props.children}
            <br/><br/>
            Carga horária: {props.cargaHoraria}
            <br/><br/>
            Remuneração: {props.remuneracao}
            {props.vagas}
            
        </div>
        
        <div className="Footer">
        {props.admin ? (<button>Ver candidatos</button>) :
        (<button onClick={() => CandidatarSe(props.nomeEvento, props.googleId)} >Candidatar-se</button>)}
        </div>

    </div>