import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import Axios from "axios";

import Card from './layout/Card.jsx'
import ListaMeusEventos from './ListaMeusEventos.jsx'
import CadastroEventos from './CadastroEventos'


export default (props) => {
	var updater = foiUpdate.bind(this)
	var [valor, setValor] = useState(0)

	function foiUpdate() {
		setValor(valor + 1)
		console.log(valor)
	}

	return(
		<>
		<Card titulo="Cadastrar Evento">
			<CadastroEventos googleId={props.googleId} updater={updater} />
		</Card>
		<ListaMeusEventos googleId={props.googleId} admin={props.admin} valor={valor}/>
		</>
	)}