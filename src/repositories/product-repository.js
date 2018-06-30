var Produto = require('../app/models/products');
var mongoose = require('mongoose');

exports.get = async () => {
    const res = await Produto.find();
    return res;
}

exports.getById = async (id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.put = async (id, data) => {
    await Produto.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao
        }
    });
}

exports.post = async (data) => {
    var product = new Produto(data);
    await product.save();
}

exports.delete = async (id) => {
    await Produto.findOneAndRemove(id);
}
