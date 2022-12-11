import React from "react";
//import eventos from "../data/eventos";
import CardEvento from './layout/CardEvento.jsx'
import Axios from "axios";

export default class ListaEventos extends React.Component {
    state = {
        eventos: []
    }

    componentDidMount() {
        Axios.get("http://localhost:8081/listaeventos")
        .then((response) => {
                const eventos = response.data
                this.setState({eventos});
        });
    }

    render() {
        return (
            <div>
            <h2>Próximos Eventos</h2>
                {
                    this.state.eventos.map(evento =>
                        <CardEvento nomeEvento={evento.nomeEvento} data={evento.data} horario={evento.horario} cargaHoraria={evento.cargaHoraria} remuneracao={evento.remuneracao} setor={evento.setor}>
                            {evento.descricao}
                        </CardEvento>
                    )
                }
            </div>
        )
    }
}