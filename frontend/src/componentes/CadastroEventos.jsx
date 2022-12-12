import React, { useState } from "react";
import Axios from "axios";

export default (props) => {
    const [values, setValues] = useState();
    console.log(values)
    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    function CadastrarEvento() {
        Axios.post("http://localhost:8081/cadastroevento", {
            nomeEvento: values.nomeEvento,
            data: values.data,
            horario: values.horario,
            descricao: values.descricao,
            cargaHoraria: values.cargaHoraria,
            remuneracao: values.remuneracao,
            setor: values.setor,
            googleId: props.googleId 
        }).then((response) => {
            console.log("resposta:" + response);
        })
    };

    //Só para debug do DB
    function MostrarEventos() {
        Axios.post("http://localhost:8081/mostrareventos",
        ).then((response) => {
            console.log("resposta:" + response);
        })
    }

    return (
        <>            
            <h5>Nome do evento: </h5>
            <input type="text" name="nomeEvento" onChange={handleChangeValues}/>
            <p>{props.googleId}</p>
            <h5>Data: </h5>
            <input type="text" name="data" onChange={handleChangeValues}/>

            <h5>Horário: </h5>
            <input type="text" name="horario" onChange={handleChangeValues}/>

            <h5>Descrição: </h5>
            <input type="text" name="descricao" onChange={handleChangeValues}/>
            
            <h5>Carga horária: </h5>
            <input type="text" name="cargaHoraria" onChange={handleChangeValues}/>
            
            <h5>Remuneração: </h5>
            <input type="text" name="remuneracao" onChange={handleChangeValues}/>

            <h5>Setor: </h5>
            <input type="text" name="setor" onChange={handleChangeValues}/>

            <br/>
            <button onClick={() => CadastrarEvento()}>Cadastrar</button>
        </>
    );
};