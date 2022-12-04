import './App.css'
import React from 'react'

import Primeiro from './componentes/Primeiro.jsx'
import ComParametro from './componentes/ComParametro.jsx'
import Card from './componentes/layout/Card.jsx'
import ComFilhos from './componentes/ComFilhos'
import Repeticao from './componentes/Repeticao'
import Condicional from './componentes/Condicional'

export default (props) => (
    <div className="App">
    <Card titulo="Condicional">
        <Condicional numero={10}>
        </Condicional>
        
    </Card>

    <Card titulo="Card dentro de outra card">
        <Card>
            Conteúdo da card de dentro da outra card
        </Card>
    </Card>
    <Card titulo="Repetição">
        <Repeticao/>
    </Card>
    <Card titulo="Primeiro Componente">
        <Primeiro />
    </Card>
    <Card titulo="Componente com parâmetro">
        <ComParametro titulo="Esse é o título" subtitulo="Esse é o subtítulo"/>
    </Card>
    <Card titulo="Componentes com filhos">
        <ComFilhos>
            <ul>
                <li>Ana</li>
                <li>Bia</li>
                <li>Carlos</li>
                <li>Daniel</li>
            </ul>
        </ComFilhos>
    </Card>
    
    </div>
);
