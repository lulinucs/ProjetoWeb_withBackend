import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import Axios from "axios";


export default (props) => {

	function login(googleData){
		Axios.post("http://localhost:8081/cadastrar", googleData).then((response) => {
			console.log(response)
		})
	}

	const responseGoogle = (response) => {
		console.log(response);
		console.log(response.profileObj.name)
		login(response)
    };


	return(
			<>
            <GoogleLogin 
			clientId="37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com"
			buttonText="Continuar com o Google"
			onSuccess={responseGoogle} />
            
            </>
)}