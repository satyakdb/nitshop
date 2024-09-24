const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/Cart");
const { body, validationResult } = require("express-validator");


router.get("/fetchcartproducts", fetchuser, async (req, res) => {
    try {
        const products = await Cart.find({ user: req.user.id });
        res.json(products);
    } catch {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


router.post(
  "/addproduct",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5}),
    body("price", "Enter a valid product price in rupees"),
    body("mainImage", "Upload images"),
    body("id","Enter a valid product id"),
  ],
  async (req, res) => {
    try {
      const { title, description, price, mainImage, id } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Cart({
        title,
        description,
        price,
        mainImage,
        product : id,
        user: req.user.id,
      });
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
  }
);

router.put(
    "/updateproduct/:id",
    async (req, res) => {
      try {
        const { title, description, price, mainImage } = req.body;
        const newProduct = {};
        if(title) {newProduct.title = title; }
        if(price) {newProduct.price = price; }
        if(mainImage) {newProduct.mainImage = mainImage; }
        if(description) {newProduct.description = description; }

        let product = await Cart.findById(req.params.id);
        product = await Cart.findByIdAndUpdate(req.params.id, {$set: newProduct}, {new: true});
        res.json(product);

      } catch {
          console.error(error.message);
          res.status(500).send("Some error occured");
      }
    }
  );

router.delete(
    "/deleteproduct/:id",
    fetchuser,
    async (req, res) => {
      try {
        let product = await Cart.findById(req.params.id);
        if(!product){
            return res.status(404).send("Not Found");
        }
        if(product.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        product = await Cart.findByIdAndDelete(req.params.id);
        res.json({"Success": "CartProduct has been deleted", product: product});

      } catch {
          console.error(error.message);
          res.status(500).send("Some error occured");
      }
    }
);
router.get(
  "/getallproducts",
  async (req, res) => {
      try {
          const product = await Cart.find({});
          res.send(product);
      } catch {
          console.error(error.message);
          res.status(500).send("Some error occured");
      }
  }
);
module.exports = router;
