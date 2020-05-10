const express = require('express') //1- importa o módulo express para dentro da variável express
const cors = require('cors')
const routes = require('./routes') // A necessidade de se utilizar ./ nesse caso, é por que do contrário a aplicação acharia que routes é um pacote e não um arquivo.

const app = express() //2- variável que irá armazenar a aplicação, rotas e funcionalidades

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333) //3- a variável agora irá escutar na porta 3333
