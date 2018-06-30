const jwt = require('jsonwebtoken');//lembrar de installar o json web token

//Passo os dados para que seja gerado um TOKEN baseado na SALT_KEY
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' }); //expira em 1 dia
}
//Recebe o token e usa a SALT_KEY para decodificar
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}
//Função de Middleware (interceptador) de todas as rotas
exports.authorize = function (req, res, next) {
    //Busco o token no body, no query string e no headers
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //Não achou o token
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        //Achou, verifico o token
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) { //Não conseguiu
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else { //Conseguiu, então next, continua a aplicação.
                next();
            }
        });
    }
};

