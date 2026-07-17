const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/store", (req, res) => {
  res.cookie('username', 'Ashish Sharma');
  res.cookie('mode', 'dark');
  res.cookie('discount', 5000);
  res.send('Cookie has been set');
});

app.get("/buy", (req, res) => {
    let price = 20000;
    const{discount}= req.cookies;
    let totalPrice= price;
    if (discount){
        totalPrice = price-discount;
    }
    res.send(`Total Price = ${totalPrice}`);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});