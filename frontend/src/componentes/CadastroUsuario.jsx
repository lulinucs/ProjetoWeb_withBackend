import React, { useState } from "react";
import Axios from "axios";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";

export default (props) => {

    

    const [values, setValues] = useState();
    console.log(values)
    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    function CadastrarUsuario(dadosGoogle) {
        Axios.post("http://localhost:8081/cadastrousuario", {
            nome: values.nome,
            pronome: values.pronome,
            nascimento: values.nascimento,
            CPF: values.CPF,
            telefone: values.telefone,
            sobre: values.sobre,
            email: dadosGoogle.profileObj.email,
            imageUrl: dadosGoogle.profileObj.imageUrl,
            tokenId: dadosGoogle.tokenId
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

    gapi.load("client:auth2", () => {
		gapi.client.init({
			clientId: "37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com",
    plugin_name: "Projeto Web",
  });
});

	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj.name)

        CadastrarUsuario(response)
	};


    return (
        <>            
            <h5>Nome: </h5>
            <input type="text" name="nome" onChange={handleChangeValues}/>
            <h5>Pronome: </h5>
            <select name="Pronome">
              <option value="Ela">Ela</option>
              <option value="Ele" selected>Ele</option>
              <option value="Neutro">Neutro</option>
            </select>        
            <h5>Data de Nascimento: </h5>
            <input type="date" name="nascimento" onChange={handleChangeValues}/>
            <h5>CPF: </h5>
            <input type="number" name="CPF" onChange={handleChangeValues}/>
            <h5>Telefone: </h5>
            <input type="number" name="telefone" onChange={handleChangeValues}/>
            <h5>Sobre você: </h5>
            <textarea name="sobre" onChange={handleChangeValues}/>
            <br/>
            <GoogleLogin 
			clientId="37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com"
			buttonText="Continuar com o Google"
			onSuccess={responseGoogle} />
        </>
    );
};