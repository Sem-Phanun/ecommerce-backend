const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();
app.use(cors((origin = "*")));

const category = require("./src/routes/categoryRoute");
const customer = require("./src/routes/customerRoute");
const product = require('./src/routes/productRoute')
const wishlist = require('./src/routes/wishlistRoute')
const payment_method = require('./src/routes/payment_methodRoute')
const order_status = require('./src/routes/order_statusRoute')
const cart = require('./src/routes/cartRoute')
const order = require('./src/routes/orderRoute')
const staff = require('./src/routes/staffRoute')

customer(app);
category(app);
product(app);
wishlist(app);
payment_method(app);
order_status(app);
cart(app);
order(app);
staff(app);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", +process.env.PORT);
});
