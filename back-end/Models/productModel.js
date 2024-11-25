const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  companyName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 4.5,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
