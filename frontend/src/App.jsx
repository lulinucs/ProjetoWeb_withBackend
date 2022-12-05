import './App.css'
import React from 'react'

import ListaEventos from './componentes/ListaEventos'
import ListaCandidatos from './componentes/ListaCandidatos'
import CardCadastro from './componentes/layout/CardCadastro'
import CadastroUsuario from './componentes/CadastroUsuario'
import CadastroEventos from './componentes/CadastroEventos'

export default (props) => (
    <div className="App">


    <CardCadastro titulo="Cadastro de Usuário">
        <CadastroUsuario/>
    </CardCadastro>

    <CardCadastro titulo="Cadastro de eventos">
        <CadastroEventos/>
    </CardCadastro>

    <ListaEventos/>
    <ListaCandidatos/>
  
    </div>
);