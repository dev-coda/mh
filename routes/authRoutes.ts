import { Router } from "express";
const {signin, signup } = require("../controllers/authControllers");
const { verifySignUp } = require("../middleware");
const App = Router();
import { Request, Response, NextFunction } from "express";


App.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

App.post(
  "/api/auth/signup",
  signup
);

App.post("/api/auth/signin", signin);
export { App };
