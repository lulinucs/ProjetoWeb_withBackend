import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import Axios from "axios";

import Card from './layout/Card.jsx'
import ListaEventos from './ListaEventos'

export default (props) => {
	

	return(
		<ListaEventos  googleId={props.googleId}/>
	)}