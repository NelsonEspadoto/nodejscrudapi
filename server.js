//importando pacotes
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Produto = require('./app/models/products');

mongoose.connect('mongodb://localhost/dbCrud');

//configuração para aplicação do body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//definir porta onde o servidor vai responder
var port = process.env.port || 8000;

//definindo as rotas
var router = express.Router();//interceptação de todas as rotas

//middleware
router.use(function(req, res, next){
    console.log("interceptação pelo middleware");
    next();
});

router.get('/', function(req, res){
    res.json({'message':'OK, rota de teste funcionando'});
});

router.route('/produtos/:productId')
    .get(function(req, res){
        const id = req.params.productId;
        
        Produto.findById(id, function(err, produto){
            if (err) {
                res.status(500).json({
                    message:"Erro ao tentar encontrar o produto; Id mal formado"
                });
            }else if(produto == null){
                res.status(400).json({
                    message:"Produto não encontrado"
                });
            }else {
                res.status(200).json({
                    message:"Produto encontrado ",
                    produto: produto
                });
            }
        });
    })

    .put(function(req, res){
        const id = req.params.productId;

        Produto.findById(id, function(err, produto){
            if(err){
                res.status(500).json({
                    message: "Erro ao tentar encontrar produto, Id mal Formado"
                });
            }   else if (produto == null) {
                res.status(400).json({
                    message:"Produto não encontrado"
                });
            }   else {
                produto.nome = req.body.nome;
                produto.preco = req.body.preco;
                produto.descricao = req.body.descricao;

                produto.save(function(erro){
                    if (erro) 
                        res.send("Erro ao tentar atualizar o produto: " + erro)

                    res.status(200).json({
                        message:"Produto atualizado com sucesso!"
                    });
                });
            }
        });
    })

    //Arrow function
    .delete(function(req, res){
        Produto.findByIdAndRemove(req.params.productId, (erro, produto) => {
            if (erro) 
                return res.status(500).send(erro);

            const response = {
                message:"Produto removido com sucesso!",
                nome: produto.nome,
                id: produto.id
            };
            return res.status(200).send(response);
        });
    });

router.route('/produtos')
    //post para CREATE produtos
    .post(function(req, res){
        var produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function(error){
            if (error) {
                res.send("Erro ao salvar o produto");
            }
            res.status(201).json({message: 'produto inserido com sucesso'});
        });
    })
    //get para READ de produtos
    .get(function(req, res){
        // Produto.find({}, 'descricao', function(err, prods){  ex: limitar o retorno para o front
        Produto.find(function(err, prods){
            if (err) 
                res.send(err);                
            
            res.status(200).json({
                message:"Produtos buscados com sucesso!",
                todosProdutos:prods
            });
        });
    });

//vinculo de aplicação (app) com o motor de rotas
app.use('/api', router);

app.listen(port);
console.log("API Server is up and running on port "+port);