import { Router } from "express";
const {login} = require("../controllers/authControllers")

const App = Router();

App.get("/login", login)

export {App}