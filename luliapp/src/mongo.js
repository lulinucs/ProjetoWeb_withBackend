const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dbprojetoweb")
    .then(() => {
    console.log("MongoDB Conectado...")
})  .catch((err) => {
    console.log("Houve um erro ao se conectar ao mongoDB: "+err)
})

const  UsuarioSchema = mongoose.Schema({

        nome: {
            type: String,
            require: true
        },
        pronome: {
            type: String,
            require: true
        },
        nascimento: {
            type: String,
            require: true
        },
        CPF: {
            type: String,
            require: true
        },
        telefone: {
            type: String,
            require: true
        }

})

mongoose.model('usuarios', UsuarioSchema)

const Usuario = mongoose.model('usuarios')

function CadastrarUsuario(nome, pronome, CPF, nascimento, telefone){
    
    new Usuario({
        nome: nome,
        pronome: pronome,
        CPF: CPF,
        nascimento: nascimento,
        telefone: telefone,
    }).save().then(() => {
        console.log("Usuário Cadastrado com sucesso!")
    }).catch((err) => {
        console.log("Deu ruim: " + err)
    })
}

