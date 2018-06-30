//importando pacotes
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');


var indexRoute = require('../src/routes/index-route');
var productRoute = require('../src/routes/products-route');

//persistência
mongoose.connect('mongodb://localhost/dbCrud');

//configuração para aplicação do body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//definir porta onde o servidor vai responder
var port = process.env.port || 8000;

//vinculo de aplicação (app) com o motor de rotas
app.use('/api', indexRoute);
app.use('/products', productRoute);

app.listen(port);
console.log("API Server is up and running on port "+port);