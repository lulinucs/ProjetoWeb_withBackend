const express = require("express");
const app = express();
const cors = require("cors")

const {MongoClient, ExplainVerbosity, ObjectId} = require('mongodb');
const DB_NAME = 'teste-db';
const MONGO_URL = 'mongodb://0.0.0.0/27017/${DB_NAME}';
var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});

async function initializeDB() {
    try {
        client.db("teste-db").createCollection("users");
        console.log("Coleção users criada")
    } catch (e) {
        console.log(e)
        console.log("Coleção users já existe");
    }

    try {
        client.db("teste-db").createCollection("events");
        console.log("Coleção events criada")
    } catch (e) {
        console.log(e)
        console.log("Coleção events já existe");
    }
}

app.use(cors());
app.use(express.json());

app.get("/", function(req, res){
    res.send("Servidor rodando!")
});

app.post("/cadastrousuario", (req, res) => {
    const { nome }  = req.body;
    const { pronome }  = req.body;
    const { CPF }  = req.body;
    const { nascimento }  = req.body;
    const { telefone }  = req.body;
    const { sobre }  = req.body;
    const { email }  = req.body;
    const { imageUrl }  = req.body;
    const { googleId }  = req.body;
    const { type } = req.body
 
    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const collection = client.db('teste-db').collection('users');
    collection.insertOne({nome: nome, pronome: pronome, CPF:CPF, nascimento: nascimento, telefone:telefone, sobre:sobre, email:email, imageUrl:imageUrl, googleId:googleId, type:type})
    console.log({nome: nome, pronome: pronome, CPF:CPF, nascimento: nascimento, telefone:telefone, sobre:sobre, email:email, imageUrl:imageUrl, googleId:googleId, type:type})
})

app.post("/mostrarusuarios", async (req, res) => {
    const usuarios = await client.db("teste-db").collection("users").find().toArray();
    console.log("USUÁRIOS:")
    for (usuario of usuarios) {
        console.log(usuario)
    }
})

app.post("/mostrareventos", async (req, res) => {
    const eventos = await client.db("teste-db").collection("events").find().toArray();
    console.log("EVENTOS:")
    for (evento of eventos) {
        console.log(evento)
    }
})

app.post("/cadastroevento", (req, res) => {
    const { nomeEvento }  = req.body;
    const { data }  = req.body;
    const { horario }  = req.body;
    const { descricao }  = req.body;
    const { cargaHoraria }  = req.body;
    const { remuneracao }  = req.body;
    const { setor } = req.body;
    const { googleId } = req.body;
    console.log("GOOGLE ID: ")
    console.log(googleId)

 
    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const collection = client.db('teste-db').collection('events');
    collection.insertOne({  nomeEvento: nomeEvento,
                            data: data,
                            horario: horario, 
                            descricao: descricao, 
                            cargaHoraria:cargaHoraria, 
                            remuneracao: remuneracao,
                            setor: setor,
                            googleId: googleId,
                            candidatos: []})
    console.log({nomeEvento: nomeEvento,
                data: data,
                horario: horario, 
                descricao: descricao, 
                cargaHoraria:cargaHoraria, 
                remuneracao: remuneracao,
                setor: setor,
                googleId: googleId});
    res.send({resposta: true})
})

app.get("/listaeventos", async (req, res) => {
    const eventos = await client.db("teste-db").collection("events").find().toArray();
    console.log(eventos);
    res.send(eventos);

})

app.get("/listacandidatos", async (req, res) => {
    const eventos = await client.db("teste-db").collection("users").find().toArray();
    res.send(eventos);

})

app.post("/cadastrar", async (req, res) => {

    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const googleId = req.body.googleId
    const email = req.body.profileObj.email
    const givenName = req.body.profileObj.givenName
    const familyName = req.body.profileObj.familyName
    const imageUrl = req.body.profileObj.imageUrl
    
    const usuarios = client.db('teste-db').collection('users');
    const found = await usuarios.find({googleId : googleId}).toArray();
    if (found.length == 0) {
        usuarios.insertOne({googleId:googleId, email:email, givenName:givenName, familyName:familyName, imageUrl:imageUrl})
        console.log("Usuario "+givenName+" cadastrado!")
    } else {
        console.log("Usuario "+givenName+" logado!")
    }
    console.log("ID: ")
    console.log(googleId)
    res.send({googleId: googleId})
})

app.post("/candidatarse", async (req, res) => {
    const { nomeEvento }  = req.body;
    const { googleId } = req.body;
 
    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const eventos = client.db('teste-db').collection('events');
    console.log(await eventos.updateOne({nomeEvento: nomeEvento}, { $push: {candidatos: googleId} }))
    console.log("deus ajude")
    
    
})

app.post("/candidatosNoEvento", async (req, res) => {
    const id = req.body.eventoId;
    console.log(id);
    const o_id = new ObjectId(id);
    const evento = await client.db('teste-db').collection('events').findOne({_id: o_id});
    const candIds = evento.candidatos;
    console.log(candIds)
    let candidatos = [];
    for (const cId of candIds) {
        console.log("CID:")
        console.log(cId)
        const cand = await client.db('teste-db').collection('users').findOne({googleId: cId});
        console.log("CANDIDATO FOR LOOP:")
        console.log(cand)
        candidatos.push(cand);
    }
    console.log("CANDIDATOS:")
    console.log(candidatos);
    res.send({lista: candidatos})
})


app.listen(8081, async function(){
    //const resultInitDB = await initializeDB();
    console.log("Servidor rodando na porta 8081");
});