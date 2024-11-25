const Product = require("../Models/productModel.js");

exports.addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const product = await Product.create(req.body);
    res.send({
      message: "Product added sucessfully!",
      success: true,
    });
  } catch (err) {
    res.send({ message: "Something went wrong. Try again later!" });
    console.log(err);
  }
};

exports.getAllProducts = async (req, res) => {
  const { companyName } = req.body;

  await Product.find({ companyName }, (err, data) => {
    if (err) {
      console.error("Error fetching products data: ", err);
      res.send({ message: "Error fetching products data!" });
    } else {
      console.log("All Products: ", data);
      res.send({ Products: data });
    }
  });
};
