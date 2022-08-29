import { Router } from "express";
const {login} = require("../controllers/authControllers")

export const App = Router();

App.get("/login", login)

module.exports = {App}