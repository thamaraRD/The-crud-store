const Product = require("../models/product.model");

//Crear la info del producto
module.exports.createProductInfo = async (req, res) => {
  try {
    const create = await Product.create(req.body);
    return res.json(create);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
//Obtener un producto By User
module.exports.getProductByUser = async (req, res) =>{
  try{

      const productByUser = await Product.find({ userId: req.params.id });
      return res.json(productByUser);
  }catch (err){
    return res.status(500).json({ error: err,
        msg: 'error desde el getProductByUser'
      });
  }
}

//Obtener un producto By ID
module.exports.getOneProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Borrar producto
module.exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.deleteOne({ _id: id })
    return res.json({
      message: "Se ha borrado el producto exítosamente",
      product: deletedProduct,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//Actualizar producto by ID
module.exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return res.json({
      message: "Se actualizó el producto correctamente",
      updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};