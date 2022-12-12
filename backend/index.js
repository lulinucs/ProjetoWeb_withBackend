const express = require("express");
const app = express();
const cors = require("cors")

const {MongoClient, ExplainVerbosity} = require('mongodb');
const DB_NAME = 'teste-db';
const MONGO_URL = 'mongodb://0.0.0.0/27017/${DB_NAME}';
var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});

async function initializeDB() {
    try {
        client.db("teste-db").createCollection(users);
        console.log("Coleção users criada")
    } catch (e) {
        console.log("Coleção users já existe");
    }

    try {
        client.db("teste-db").createCollection(events);
        console.log("Coleção events criada")
    } catch (e) {
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
 
    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const collection = client.db('teste-db').collection('events');
    collection.insertOne({nomeEvento: nomeEvento,
                            data: data,
                            horario: horario, 
                            descricao: descricao, 
                            cargaHoraria:cargaHoraria, 
                            remuneracao: remuneracao,
                            setor: setor,
                            googleId: googleId})
    console.log({nomeEvento: nomeEvento,
                data: data,
                horario: horario, 
                descricao: descricao, 
                cargaHoraria:cargaHoraria, 
                remuneracao: remuneracao,
                setor: setor,
                googleId: googleId});
})

app.get("/listaeventos", async (req, res) => {
    const eventos = await client.db("teste-db").collection("events").find().toArray();
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
    usuarios.insertOne({googleId:googleId, email:email, givenName:givenName, familyName:familyName, imageUrl:imageUrl})
    console.log("Usuario "+givenName+" cadastrado!")


    res.send(googleId)
})


app.listen(8081, async function(){
    const resultInitDB = await initializeDB();
    console.log("Servidor rodando na porta 8081");
});