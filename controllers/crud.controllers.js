const fs = require("fs");
const { Product } = require("../models/products.schema");

exports.getObj = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // If product doesn't exist, return an error
    return res.status(404).json({ error: "Product not found" });
  }
  // If product exists, return it
  return res.status(200).json(product);
};

exports.updateObj = async (req, res) => {
  // Check if the product exists
  const product = await Product.findById(req.params.id);
  if (!product) {
    // If product doesn't exist, return an error
    return res.status(404).json({ error: "Product not found" });
  }
  // If product exists, update its fields
  product.set(req.body); // assuming req.body contains updated fields
  await product.save();
  return res.status(200).json(product);
};

exports.deleteObj = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // If product doesn't exist, return an error
    return res.status(404).json({ error: "Product not found" });
  }
  // If product exists, delete it
  await product.remove();
  return res.status(200).json({ message: "Product deleted successfully" });
};

exports.createObj = async (req, res) => {
  const existingProduct = await Product.findOne({
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
  });

  if (existingProduct) {
    // If product exists, return an error
    return res.status(400).json({ error: "Product already exists" });
  }
  const newObj = new Product(req.body);
  newObj.id = Date.now().toString();
  await newObj.save();
  res.status(201).json({ message: "Object Created" });
};
