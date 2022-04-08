const {
  createProductInfo,
  getProductByUser,
  getOneProductById,
  updateProductById,
  deleteProductById
} = require("../controllers/product.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

module.exports = (app) => {
  app.post("/api/product/create", validateJWT, createProductInfo);
  app.get("/api/product/user/:id", validateJWT,  getProductByUser);
  app.get("/api/product/:id", validateJWT, getOneProductById);
  app.put("/api/product/update/:id", validateJWT, updateProductById);
  app.delete("/api/product/delete/:id", validateJWT, deleteProductById);
};
