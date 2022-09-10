import express from "express";
import cors from 'cors';

import userRoutes from "./routes/user.routes";
import Server from "./classes/server";
import { dbConnection } from "./database/config";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";

// Language: typescript
dotenv.config();
const server = new Server();

//cors
server.app.use(cors({ origin: true, credentials: true }));
server.app.use(express.json());

//declare routes
server.app.use('/api/users', userRoutes);
server.app.use('/api/login', authRoutes);


//connect to database
dbConnection();

//Start the server
server.start();
