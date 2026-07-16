const mongoose = require("mongoose");
const Product = require("./models/product");

const data = [
    {
        image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600",
        name: "Product 1",
        description: "This is the first product",
        price: 19.99
    },
    {
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
        name: "Product 2",
        description: "This is the second product",
        price: 29.99
    },
    {
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        name: "Product 3",
        description: "This is the third product",
        price: 39.99
    },
    {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        name: "Product 4",
        description: "This is the fourth product",
        price: 49.99
    }
];

async function seedDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/VGU-Ecom");
        console.log("DB Connected");

        // Optional: clear existing products
        await Product.deleteMany({});

        // Insert new products
        await Product.insertMany(data);

        console.log("Products inserted successfully");

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

seedDB();