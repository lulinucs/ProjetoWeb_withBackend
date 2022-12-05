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

    function CadastrarUsuario() {
        Axios.post("http://localhost:8081/cadastrousuario", {
            nome: values.nome,
            pronome: values.pronome,
            nascimento: values.nascimento,
            CPF: values.CPF,
            telefone: values.telefone
        }).then((response) => {
            console.log("resposta:" + response);
        })
    };

    //Só para debug do DB
    function MostrarUsuarios() {
        Axios.post("http://localhost:8081/mostrarusuarios",
        ).then((response) => {
            console.log("resposta:" + response);
        })
    }


    return (
        <>            
            <h5>Nome: </h5>
            <input type="text" name="nome" onChange={handleChangeValues}/>
            <h5>Pronome: </h5>
            <input type="text" name="pronome" onChange={handleChangeValues}/>
            <h5>Data de Nascimento: </h5>
            <input type="text" name="nascimento" onChange={handleChangeValues}/>
            <h5>CPF: </h5>
            <input type="text" name="CPF" onChange={handleChangeValues}/>
            <h5>Telefone: </h5>
            <input type="text" name="telefone" onChange={handleChangeValues}/>
            <br/>
            <button onClick={() => CadastrarUsuario()}>Cadastrar</button>
            <button onClick={() => MostrarUsuarios()}>Print</button>
        </>
    );
};