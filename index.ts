import Server from "./classes/server";
import { dbConnection } from "./database/config";
import dotenv from "dotenv";

// Language: typescript
dotenv.config();
const server = new Server();

// Routes
server.routes();

//connect to database
dbConnection();

//Start the server
server.start();
