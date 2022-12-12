import './App.css'
import React, { useState } from 'react'


import ListaEventos from './componentes/ListaEventos'
import ListaCandidatos from './componentes/ListaCandidatos'
import CardCadastro from './componentes/layout/CardCadastro'
import CadastroUsuario from './componentes/CadastroUsuario'
import CadastroEventos from './componentes/CadastroEventos'
import Card from './componentes/layout/Card.jsx'
import Staff from './componentes/Staff.jsx'
import Admin from './componentes/Admin.jsx'
import GoogleLogin from 'react-google-login';
import Axios from "axios";




export default function App() {

	var [googleId, setGoogleId] = useState(false)
	var [admin, setAdmin] = useState(true)

	function login(googleData){
		Axios.post("http://localhost:8081/cadastrar", googleData).then((response) => {
			console.log(response)
			console.log(response.data)
			setGoogleId(response.data)
		})
	}

	const responseGoogle = (response) => {
		login(response)
		console.log(response)
	};


	return(

		<div className="App">
		
			{googleId != false ? 
			
			(admin ? (<Admin googleId={googleId} admin={admin}/>) : (<Staff googleId={googleId}/>)

) : (
		
			<Card titulo="Login">

					<input type="checkbox" />
					<h5>Logar como produtor</h5>

				<GoogleLogin 
				clientId="37207957043-ecnp4grtj6naao34efml5ml3t4jo3u3p.apps.googleusercontent.com"
				buttonText="Continuar com o Google"
				onSuccess={responseGoogle} />
			</Card>
			)}
		</div>
		

)}
