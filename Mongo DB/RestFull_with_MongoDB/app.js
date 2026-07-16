const express = require("express");
const mongoose = require("mongoose");
const Products = require("./models/product");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/VGU-Ecom")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Create Page
app.get("/create", (req, res) => {
  res.render("new");
});

// Show All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.render("products", { products });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching products");
  }
});

// Create Product
app.post("/products", async (req, res) => {
  try {
    const { name, image, description, price } = req.body;

    await Products.create({
      name,
      image,
      description,
      price,
    });

    res.redirect("/products");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating product");
  }
});

// Edit Page
app.get("/products/:id/edit", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("edit", { product });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading edit page");
  }
});

// Update Product
app.put("/products/:id", async (req, res) => {
    try {
        const { name, image, description, price } = req.body;

        await Products.findByIdAndUpdate(req.params.id, {
            name,
            image,
            description,
            price
        });

        res.redirect("/products");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating product");
    }
});

app.get("/view/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.render("view", { product });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching product");
  }
});
//show product details
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render("show", { product });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

//delete product
app.delete("/products/:id", async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting product");
    }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});