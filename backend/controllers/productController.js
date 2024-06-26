const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}} : {}

  
 const products = await Product.find({...keyword});
 console.log(products)
  res.json(products);

});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Producto no encontrado.");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Producto removido." });
  } else {
    res.status(404);
    throw new Error("Producto no encontrado.");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: " ",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: " ",
    category: " ",
    stock: 0,
    numReviews: 0,
    description: " ",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.stock = stock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Producto no encontrado.");
  }
});


const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {

const reviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

if (reviewed) {
  res.status(400)
  throw new Error('Ya has dejado tu comentario para este producto.')
}

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  }

  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length

  await product.save()
  res.status(201).json({message: 'Review Added!'})

  } else {
    res.status(404);
    throw new Error("Producto no encontrado.");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3) 

  res.json(products)
});

module.exports = {
  getProducts: getProducts,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  createReview: createReview,
  getTopProducts: getTopProducts

};
