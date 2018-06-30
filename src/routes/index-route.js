const express = require('express');
var router = express.Router();

//middleware
router.use(function(req, res, next){
    console.log("interceptação pelo middleware OK");
    next();
});

router.get('/', function(req, res){
    res.json({'message':'OK, rota de teste funcionando'});
});

module.exports = router;