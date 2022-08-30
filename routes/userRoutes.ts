import  {authJwt}  from "../middleware";
import {allAccess, userBoard, moderatorBoard, adminBoard} from "../controllers/userControllers";
import { Router } from "express";
const App = Router();
import {Request, Response,NextFunction} from "express"

App.use(function(req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  App.get("/api/test/all", allAccess);

  App.get("/api/test/user", [authJwt.verifyToken as any], userBoard);

  App.get(
    "/api/test/mod",
    [authJwt.verifyToken as any, authJwt.isModerator],
    moderatorBoard
  );

  App.get(
    "/api/test/admin",
    [authJwt.verifyToken as any, authJwt.isAdmin as any],
    adminBoard
  );
export {App}