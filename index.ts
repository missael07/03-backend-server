import Server from "./classes/server";
import { dbConnection } from "./database/config";
import dotenv from "dotenv";
import cors from 'cors';


// Language: typescript
dotenv.config();
const server = new Server();

server.app.use(cors({ origin: true, credentials: true }));
// Routes
server.routes();

//connect to database
dbConnection();

//Start the server
server.start();
