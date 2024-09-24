const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var JWT_SECRET = "PoraUngamma";
const fetchuser = require("../middleware/fetchuser");
// ROUTE 1: Create a user using end point /createuser . No Login Required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({ min: 5 }),
    body("contact", "Enter a valid phone number").isLength(10),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        contact: req.body.contact,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success, authToken });
    } catch {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 2: Authenticate a user using end point /login. Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Passwords cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin user details using end point /getuser. Login Required
router.post(
  "/getuser", fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put(
    "/updateuser/:id", fetchuser,
    async (req, res) => {
        try {
          const { name, contact } = req.body;
          const newUser = {};
          if(name) {newUser.name = name; }
          if(contact) {newUser.contact = contact; }
  
          let user = await User.findById(req.params.id);     
          user = await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {new: true});
          res.json(user);
  
        } catch {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
  );
module.exports = router;
