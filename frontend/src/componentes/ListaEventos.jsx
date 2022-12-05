import React from "react";
import eventos from "../data/eventos";
import produtos from '../data/eventos'
import CardEvento from './layout/CardEvento.jsx'

function getEventos() {
    return eventos.map(event => {
        return <CardEvento nome={event.nome} data={event.data} hora={event.hora} cargahoraria={event.cargahoraria} remuneracao={event.remuneracao} setor={event.setor}>
            {event.descricao}
        </CardEvento>
    })
}

export default props => {
    return (
        <div>
            <h2>Próximos Eventos</h2>
                {getEventos()}
        </div>
    )
}