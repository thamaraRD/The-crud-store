const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel"
    },
    nameOfProduct: {
      type: String,
      required: [true, "Ingrese el nombre del producto"],
      minlength: [4, "El producto debe tener más de 4 caracteres"],
    },
    brand: {
      type: String,
      required: [true, "Ingrese la marca del producto"],
    },
    item: {
      type: Number,
      required: [true, "Se requiere el item del producto"],
      minlength: [3, "El item debe tener  3 caracteres"],
    },
    color: {
      type: String
    },
    madeIn: {
      type: String,
      required: [true, 'Se requiere información de donde proviene']
    },
    weight: {
      type: Number
    },
    material: {
      type: String
    },
    productImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
