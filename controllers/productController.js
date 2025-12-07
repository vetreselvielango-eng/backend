import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => { //function to get all products from the database
  try {                                          //try to do this code
    const products = await Product.find();      //get all products from the database
    res.json(products);                         //send the products back to the client as JSON. MongoDB returns all product documents.
  } catch (error) {                             //if there is an error
    res.status(500).json({ message: "Server error" }); //send a 500 error back to the client
  }
};

// ADD PRODUCT
export const addProduct = async (req, res) => { //function to add a new product to the database
  try {
    const product = new Product(req.body);      //create a new product using the data from the request body
    await product.save();                       //save the product to the database
    res.json({ message: "Product added successfully" });  //send a success message back to the client
  } catch (error) {                             //if there is an error
    res.status(500).json({ message: "Add product failed" }); //send a 500 error back to the client
  }
};
