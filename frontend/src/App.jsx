import './App.css'
import React from 'react'


import ListaEventos from './componentes/ListaEventos'
import ListaCandidatos from './componentes/ListaCandidatos'
import CardCadastro from './componentes/layout/CardCadastro'
import CadastroUsuario from './componentes/CadastroUsuario'
import CadastroEventos from './componentes/CadastroEventos'
import Card from './componentes/layout/Card.jsx'
import Login from './componentes/Login.jsx'






export default (props) => (

    <div className="App">


    <Card titulo="Entrar ou Cadastrar">
     <Login />

    </Card>
   

{/*    
    <CardCadastro titulo="Cadastro de Usuário">
        <CadastroUsuario/>
    </CardCadastro>

    <CardCadastro titulo="Cadastro de eventos">
        <CadastroEventos/>
    </CardCadastro>

    <ListaEventos/>
    <ListaCandidatos/>
*/}    
  
    </div>
);