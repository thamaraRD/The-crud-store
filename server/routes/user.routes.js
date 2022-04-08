const { registerUser, loginUser } = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
};
