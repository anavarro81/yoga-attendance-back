
const expres = require("express");
const {createUser, getUsers} = require("../controllers/user.controller");
const userRoutes = expres.Router();


userRoutes.post("/users", createUser);
userRoutes.get("/get-users", getUsers);

module.exports = userRoutes;