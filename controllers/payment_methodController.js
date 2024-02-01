const Stripe = require("stripe");
const dotenv = require("dotenv");
const db = require("../config/db");
dotenv.config();
const stripe = Stripe(process.env.STRIPE_API);

// const create = async (req,res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "", //product name
//               },
//               unit_amount: 2000,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: `${process.env.CLIENT_URL}/success`, //endpoint frontend
//         cancel_url: `${process.env.CLIENT_URL}/cancel`, //endpoint frontend
//     });
// }

// const paymentSuccess = async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//   const customer = await stripe.customers.retrieve(session.customer);

//   res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
// };

const getAllPaymentMethod = async (req, res) => {
  const sql = "SELECT * FROM tbl_payment_method";
  const payment = await db.query(sql);
  res.json({
    list: payment,
  });
};

const createPaymentMethod = async (req, res) => {
  var { name, code } = req.body;
  const sql = "INSERT INTO tbl_payment_method (name, code) VALUES(?,?)";
  const param = [name, code];
  const payment = await db.query(sql, param);
  res.json({
    list: payment,
  });
};

const removePaymentMethod = async (req, res) => {
  var { payment_id } = req.body;
  const sql = "DELETE FROM tbl_payment_method WHERE payment_id = ?";
  const payment = await db.query(sql, [payment_id]);
  res.json({
    list: payment,
  });
};

module.exports = {
  getAllPaymentMethod,
  createPaymentMethod,
  removePaymentMethod,
};
