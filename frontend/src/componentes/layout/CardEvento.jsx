import React, { useState } from 'react'
import './Card.css'
import './Button.css'
import Axios from "axios";



export default  (props) => {

 

    function CandidatarSe(nomeEvento, googleId) {
        Axios.post("http://localhost:8081/candidatarse", {
            nomeEvento: nomeEvento,
            googleId: googleId
        }).then((response) => {
            console.log("resposta:" + response);


        })
};

    return(
        <div className="Card">
            <div className="Header">
                {props.nomeEvento} - {props.setor}
            </div>

            <div className="Conteudo">
                {props.data} às {props.horario}
                <br/><br/>
                Carga horária: {props.cargaHoraria}
                <br/><br/>
                Remuneração: {props.remuneracao}
                <br/><br/>
                {props.children}
                

            
            </div>
        
            <div className="Footer">
            {props.admin ? ('') :
            (<button onClick={() => CandidatarSe(props.nomeEvento, props.googleId)} >Candidatar-se</button>)}
            </div>

        </div>
)}