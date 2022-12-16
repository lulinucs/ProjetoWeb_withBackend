import React, { useState } from 'react'
import './Card.css'
import './Button.css'
import Axios from "axios";
import { useEffect } from 'react';



export default  (props) => {
    const [buttonData, setButtonData] = useState(<></>)
    const [apertou, setApertou] = useState(false)
    const [excluiu, setExcluiu] = useState(false) // como esconder card ao excluir?

    async function CandidatarSe(idEvento, googleId) {
        console.log(idEvento);
        const res = await Axios.post("http://localhost:8081/candidatarse", {
            idEvento: idEvento,
            googleId: googleId
        });
        console.log("resposta:" + res.data.texto);
        setApertou(true)
        
    };

    async function Deletar(idEvento) {
        console.log(idEvento); //ta dando undefined, n ta pegando o idEvento
        const res = await Axios.post("http://localhost:8081/excluirevento", {
            eventoId: idEvento,
        });
        if (res.data.status == 200) {
            console.log("sucesso!")
            props.updateFunc()
        } else {
            console.log("cagou")
        }
    }

    function estaCandidatado(apertou) {
        if (props.admin) return <></>
        
        if (props.candidatos.includes(props.googleId) || apertou) {
            console.log("ESTOU AQUI")
            return <p><i>Você já se candidatou para este evento!</i></p>
        } else {
            return <button onClick={async () => await CandidatarSe(props.idEvento)} >Candidatar-se</button>
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
                {props.admin &&
                    <button id='delete_button' onClick={async () => await Deletar(props.idEvento)}>Excluir evento</button>
                }
            </div>
        </div>
)}