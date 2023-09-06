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

const category = require("./routes/categoryRoute");
const customer = require("./routes/customerRoute");
const product = require('./routes/productRoute')
const wishlist = require('./routes/wishlistRoute')
const payment_method = require('./routes/payment_methodRoute')
const order_status = require('./routes/order_statusRoute')
const cart = require('./routes/cartRoute')
const order = require('./routes/orderRoute')
const staff = require('./routes/staffRoute')

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
