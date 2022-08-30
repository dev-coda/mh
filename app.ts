import express, {Request, Response} from "express"
import {App as authRoutes} from "./routes/authRoutes"
import {App as userRoutes} from "./routes/userRoutes"
import cors from "cors"

// create our Express app
const app = express();
const corsOptions = {
  origin: "*"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", authRoutes)
app.use("/user", userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server Online');
});
// done! we export it so we can start the site in start.js
export {app};
