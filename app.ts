import express, {Request, Response} from "express"
import {App as routes} from "./routes/authRoutes"

// create our Express app
const app = express();

app.use("/", routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
// done! we export it so we can start the site in start.js
export {app};
