import React from "react";
//import eventos from "../data/eventos";
import CardEvento from './layout/CardEvento.jsx'
import Axios from "axios";



export default class ListaEventos extends React.Component {
    state = {
        meusEventos: []
    }



    componentDidMount() {
        Axios.get("http://localhost:8081/listaeventos")
        .then((response) => {
                const eventos = response.data
                const meusEventos = eventos.filter(evento => (evento.googleId == this.props.googleId))
                console.log(meusEventos)

                this.setState({meusEventos});


        });
    }


    render() {
        return (
            <div>
            <h2>Próximos Eventos</h2>
                {       
                        this.state.meusEventos.map(evento =>  
                        <CardEvento admin={this.props.admin} nomeEvento={evento.nomeEvento} data={evento.data} horario={evento.horario} cargaHoraria={evento.cargaHoraria} remuneracao={evento.remuneracao} setor={evento.setor}>
                            {evento.descricao}
                        </CardEvento>
                    )
                }
            </div>
        )
    }
}