import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
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

	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isNewUser, setIsNewUser] = useState()
    const [onCadastro, setOnCadastro] = useState(false)



	function cadastrarUsuario(dadosGoogle) {
        Axios.post("http://localhost:8081/cadastrousuario", {
            nome: values.nome,
            pronome: values.pronome,
            nascimento: values.nascimento,
            CPF: values.CPF,
            telefone: values.telefone,
            sobre: values.sobre,
            email: dadosGoogle.profileObj.email,
            imageUrl: dadosGoogle.profileObj.imageUrl,
            tokenId: dadosGoogle.tokenId,
            type: values.type
        }).then((response) => {
            console.log("resposta:" + response);
        })
    };

	function verificaUsuario(dadosGoogle) {
		Axios.get("http://localhost:8081/listacandidatos")
        .then((response) => {
                const candidatos = response.data
                if (candidatos.length==0){
                        setIsNewUser(true)
                        setOnCadastro(true)
                }
				for (var i=0; i<candidatos.length; i++){
					if (dadosGoogle.email == candidatos[i].email){
						console.log("Usuário "+ candidatos[i].nome+" já cadastrado.")
                        setIsNewUser(false)
                        setIsLoggedIn(true)
                        break
					}else{
                        setIsNewUser(true)
                        setOnCadastro(true)
                    }
					
				}
        });
	}

	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj.name)
        verificaUsuario(response.profileObj)
        if (onCadastro==true){
            console.log("É PRA CADASTRAR")
            cadastrarUsuario(response)
        }



	};
		
	gapi.load("client:auth2", () => {
		gapi.client.init({
			clientId: "37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com", plugin_name: "Projeto Web",
	});




});
	
	return(
            <>
            {isNewUser ? (
			<>
			<h5>Nome: </h5>
            <input type="text" name="nome" onChange={handleChangeValues}/>
            <h5>Pronome: </h5>
            <select name="Pronome" onChange={handleChangeValues}>
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
            <select name="type" onChange={handleChangeValues}>
              <option value="recrutador">Recrutador</option>
              <option value="staff" selected>Staff</option>
            </select> 
            <br/>
            
            </>
            ) : (''
			
			)}

            <GoogleLogin 
			clientId="37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com"
			buttonText="Continuar com o Google"
			onSuccess={responseGoogle} />
            </>
            
			
			
			

		
	)
}