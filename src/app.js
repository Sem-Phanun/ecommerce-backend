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

const categoryRoute = require("./routes/categoryRoute");
const customerRoute = require("./routes/customerRoute");
const productRoute = require('./routes/productRoute')
const wishlist = require('./routes/wishlistRoute')
const paymentMethod = require('./routes/payment_methodRoute')
const orderStatus = require('./routes/order_statusRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute')
const employeeRoute = require('./routes/employeeRoute')



app.use(cartRoute);
app.use(categoryRoute);
app.use(customerRoute)
app.use(productRoute)
app.use(wishlist)
app.use(paymentMethod)
app.use(orderStatus)
app.use(orderRoute)
app.use(employeeRoute)


app.listen(process.env.PORT, () => {
  console.log("Server running on port", + process.env.PORT);
});
