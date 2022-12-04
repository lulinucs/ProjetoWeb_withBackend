const express = require("express");
const app = express();
const cors = require("cors")

const {MongoClient, ExplainVerbosity} = require('mongodb');
const DB_NAME = 'teste-db';
const MONGO_URL = 'mongodb://0.0.0.0/27017/${DB_NAME}';
var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});

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
 
    try {
        const res = client.connect();
        console.log("Conectado")
    } catch (e) {
        console.error("erro: "+e)
    }

    const collection = client.db('teste-db').collection('users');
    collection.insertOne({nome: nome, pronome: pronome, CPF:CPF, nascimento: nascimento, telefone:telefone})
 
 

})



app.listen(8081, function(){
    console.log("Servidor rodando na porta 8081");
});