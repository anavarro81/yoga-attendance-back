
const expres = require("express");
const {createUser} = require("../controllers/user.controller");
const userRoutes = expres.Router();


userRoutes.post("/users", createUser);

module.exports = userRoutes;