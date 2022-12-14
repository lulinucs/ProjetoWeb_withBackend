import React from "react";
//import eventos from "../data/eventos";
import CardEvento from './layout/CardEvento.jsx'
import Axios from "axios";

async function getCandidatos(evento) {
    console.log("ID EVENTO:")
    console.log(evento._id)
    const res = await Axios.post("http://localhost:8081/candidatosNoEvento",
                {eventoId: evento._id});
    const lista = res.data;
    console.log("CANDIDATOS RECEBIDOS:")
    console.log(lista)
    return lista
}

async function listaeventos() {
    const response = await Axios.get("http://localhost:8081/listaeventos")
    const eventos = response.data
    const meusEventos = eventos.filter(evento => (evento.googleId == this.props.googleId))
    console.log("MEUS EVENTOS")
    console.log(meusEventos)
    console.log(this.props.googleId)
    for (const evento of meusEventos) {
        console.log("EVENTO LOOP: ")
        console.log(evento)
        const cands = await getCandidatos(evento);
        const nomes = cands.lista.map(cand => cand.givenName + " " + cand.familyName)
        evento.candidatos = nomes;
    }

    this.setState({meusEventos: meusEventos});
    console.log("ESTADO: ")
    console.log(this.state.meusEventos)

    //const lista = await Promise.all(meusEventos.map(async (evento) => await getCandidatos(evento)))
    //console.log("LISTA EVENTOS:")
    //console.log(lista)
    //this.setState({candidatosPorEvento: lista})
}

export default class ListaEventos extends React.Component {
    state = {
        meusEventos: [],
        candidatosPorEvento: [],
        update: 0
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.valor != this.props.valor) {
            console.log("update?")
            const response = await Axios.get("http://localhost:8081/listaeventos")
            const eventos = response.data
            const meusEventos = eventos.filter(evento => (evento.googleId == this.props.googleId))
            console.log("MEUS EVENTOS")
            console.log(meusEventos)
            console.log(this.props.googleId)
            for (const evento of meusEventos) {
                console.log("EVENTO LOOP: ")
                console.log(evento)
                const cands = await getCandidatos(evento);
                const nomes = cands.lista.map(cand => cand.givenName + " " + cand.familyName)
                evento.candidatos = nomes;
            }
    
            this.setState({meusEventos: meusEventos});
            console.log("ESTADO: ")
            console.log(this.state.meusEventos)
            console.log("UPDATED")
        }
    }

    async componentDidMount() {
        const response = await Axios.get("http://localhost:8081/listaeventos")
        const eventos = response.data
        const meusEventos = eventos.filter(evento => (evento.googleId == this.props.googleId))
        console.log("MEUS EVENTOS")
        console.log(meusEventos)
        console.log(this.props.googleId)
        for (const evento of meusEventos) {
            console.log("EVENTO LOOP: ")
            console.log(evento)
            const cands = await getCandidatos(evento);
            const nomes = cands.lista.map(cand => cand.givenName + " " + cand.familyName)
            evento.candidatos = nomes;
        }

        this.setState({meusEventos: meusEventos});
        console.log("ESTADO: ")
        console.log(this.state.meusEventos)

        //const lista = await Promise.all(meusEventos.map(async (evento) => await getCandidatos(evento)))
        //console.log("LISTA EVENTOS:")
        //console.log(lista)
        //this.setState({candidatosPorEvento: lista})
    }

    render() {
        return (
            <div>
            <h2>Meus Eventos</h2>
                {       
                        this.state.meusEventos.map(evento =>  
                        <CardEvento admin={this.props.admin} 
                                    nomeEvento={evento.nomeEvento} 
                                    data={evento.data} 
                                    horario={evento.horario} 
                                    cargaHoraria={evento.cargaHoraria} 
                                    remuneracao={evento.remuneracao} 
                                    setor={evento.setor}
                                    candidatos={evento.candidatos}>
                            {evento.descricao}
                            <h5>Candidatos</h5>
                            <ul>
                                {evento.candidatos.map(cand => <li>{cand}</li>)}
                            </ul>

                        </CardEvento>
                    )
                }
            </div>
        )
    }
}