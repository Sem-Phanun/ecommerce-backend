const customerCt = require("../controllers/customerController");
const { userGuard } = require("../helper/auth")
const base_route = "/api/customer";
const customer = (app) => {
  app.get(base_route, userGuard, customerCt.getCustomerList);
  app.get(`${base_route}/:id`, customerCt.getOneCustomer);
  app.post(`${base_route}`,customerCt.createCustomerAddress);
  app.post(`${base_route}/auth/login`,userGuard, customerCt.login)
  app.put(`${base_route}`, customerCt.updateCustomer);
  app.delete(`${base_route}/:id`,customerCt.removeCustomer);

  app.get(`${base_route}_address`, customerCt.addressList);
  app.get(`${base_route}_address/:id`, customerCt.getOneAddress);
  app.post(`${base_route}_address`, customerCt.addNewAddress);
  app.put(`${base_route}_address`, customerCt.updateAddress);
  app.delete(`${base_route}_address/:id`, customerCt.removeAddress);
};

module.exports = customer;
