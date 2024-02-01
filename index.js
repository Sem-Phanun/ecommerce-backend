import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"


const app = express();


app.use(bodyParser.json());
app.use(express.json());
dotenv.config();
app.use(cors());




import categoryRoute from "./routes/categoryRoute";
import customerRoute from "./routes/customerRoute";
import productRoute from './routes/productRoute'
import wishlist from './routes/wishlistRoute'
import paymentMethod from './routes/payment_methodRoute'
import orderStatus from './routes/order_statusRoute'
import cartRoute from './routes/cartRoute'
import orderRoute from './routes/orderRoute'
import employeeRoute from './routes/employeeRoute'





app.use("/api/v1",cartRoute);
app.use("/api/v1",categoryRoute);
app.use("/api/v1",customerRoute)
app.use("/api/v1",productRoute)
app.use("/api/v1",wishlist)
app.use("/api/v1",paymentMethod)
app.use("/api/v1",orderStatus)
app.use("/api/v1",orderRoute)
app.use("/api/v1",employeeRoute)


app.listen(process.env.PORT, () => {
  console.log("Server running on port", + process.env.PORT);
});
