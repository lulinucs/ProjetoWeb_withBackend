import React, { useState } from 'react'
import './Card.css'
import './Button.css'
import Axios from "axios";
import { useEffect } from 'react';



export default  (props) => {
    const [buttonData, setButtonData] = useState(<></>)
    const [apertou, setApertou] = useState(false)

    async function CandidatarSe(nomeEvento, googleId) {
        const res = await Axios.post("http://localhost:8081/candidatarse", {
            nomeEvento: nomeEvento,
            googleId: googleId
        });
        console.log("resposta:" + res.data.texto);
        setApertou(true)
        
    };

    function estaCandidatado(apertou) {
        if (props.admin) return <></>
        
        if (props.candidatos.includes(props.googleId) || apertou) {
            console.log("ESTOU AQUI")
            return <p><i>Você já se candidatou para este evento!</i></p>
        } else {
            return <button onClick={async () => await CandidatarSe(props.nomeEvento, props.googleId)} >Candidatar-se</button>
        }
    }

    useEffect(() => {
        const res = estaCandidatado(apertou)
        setButtonData(res)
    }, [apertou])

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
                {buttonData}
            </div>

        </div>
)}