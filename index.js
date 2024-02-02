import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"


const app = express();

app.use(bodyParser.json());
app.use(express.json());
dotenv.config();
app.use(cors());




import categoryRoute from "./routes/categoryRoute.js";
import customerRoute from "./routes/customerRoute.js";
import productRoute from './routes/productRoute.js'
import wishlist from './routes/wishlistRoute.js'
import paymentMethod from './routes/payment_methodRoute.js'
import orderStatus from './routes/order_statusRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import employeeRoute from './routes/employeeRoute.js'





app.use("/api/v1",cartRoute);
app.use("/api/v1",categoryRoute)
app.use("/api/v1",customerRoute)
app.use("/api/v1",productRoute)
app.use("/api/v1",wishlist)
app.use("/api/v1",paymentMethod)
app.use("/api/v1",orderStatus)
app.use("/api/v1",orderRoute)
app.use("/api/v1",employeeRoute)

app.get("/" , (req,res) => {
  res.send({
    mesg: "Okay"
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log("Server running on port", + PORT);
});
