import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import Axios from "axios";

import Card from './layout/Card.jsx'
import ListaMeusEventos from './ListaMeusEventos.jsx'
import CadastroEventos from './CadastroEventos'

export default (props) => {
	

	return(
		<>
		<Card titulo="Cadastrar Evento">
			<CadastroEventos googleId={props.googleId} />
		</Card>
		<ListaMeusEventos googleId={props.googleId} admin={props.admin}/>
		</>
	)}