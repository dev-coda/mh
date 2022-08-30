import jwt, {Jwt} from "jsonwebtoken";
import {User} from "../models/User"
import {Role} from "../models/Role"
import {Request, Response,NextFunction} from "express"

interface tokenRequest extends Request {
    userId: string
}


const verifyToken = (req: tokenRequest, res: Response, next: NextFunction) => {
  const token : string | string[] = req.headers["x-access-token"] || [];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token as string, process.env.SECRET as string, (err, decoded : any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

   if(decoded) { req.userId = decoded.id};
    next();
  });
};

const isAdmin = (req: tokenRequest, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user!.roles }
      },
      (err : any, roles :any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req: tokenRequest, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user!.roles }
      },
      (err: any, roles : any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
export {authJwt};