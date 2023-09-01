const controller = require("../controllers/categoryController");
// const userGuard = require("../controllers/authController")
const route = "/api/category";
const category = (app) => {
  app.get(`${route}`, controller.getAllCategory);
  app.get(`${route}/:id`, controller.getOne);
  app.post(`${route}`, controller.createCategory);
  app.put(`${route}`, controller.updateCategory);
  app.delete(`${route}`, controller.removeCategory);
};
module.exports = category;
