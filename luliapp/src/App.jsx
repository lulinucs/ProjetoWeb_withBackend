import './App.css'
import React from 'react'

import ListaEventos from './componentes/ListaEventos'
import ListaCandidatos from './componentes/ListaCandidatos'
import CardCadastro from './componentes/layout/CardCadastro'
import CadastroUsuario from './componentes/CadastroUsuario'

export default (props) => (
    <div className="App">


    <CardCadastro titulo="Cadastro de Usuário">
        <CadastroUsuario/>
    </CardCadastro>
    <ListaEventos/>
    <ListaCandidatos/>



    
    </div>
);





