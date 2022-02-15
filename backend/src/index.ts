import express from "express"
import { connectToDatabase } from "./Services/databaseService";
import SignUpRouter from "./Routes/SignUpRoute"
import LoginRouter from "./Routes/LoginRoute"
import LogoutRouter from "./Routes/LogoutRoute"
import session from "express-session";
import { sessionConfig } from "./Config/Session";
import cors from "cors"
const app: express.Application = express();
const PORT = 3001; // TODO: Change to dotenv later.

connectToDatabase().then(() => {
    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
      }));
    app.use(session(sessionConfig))
    app.use('/signUp', SignUpRouter)
    app.use('/login', LoginRouter)
    app.use('/logout', LogoutRouter)
    app.listen(PORT);
    console.log("Listening");
}).catch((error) => {
    console.error(error);
    process.exit();
})
