import React from "react";
import candidatos from "../data/candidatos";
import CardCandidato from './layout/CardCandidato.jsx'

function getCandidatos() {
    return candidatos.map(cand => {
        return <CardCandidato nome={cand.nome} pronome={cand.pronome} CPF={cand.CPF} nascimento={cand.nascimento} telefone={cand.telefone} experiencia={cand.experiencia}>
        </CardCandidato>
    })
}

export default props => {
    return (
        <div>
            <h2>Candidatos</h2>
                {getCandidatos()}
        </div>
    )
}