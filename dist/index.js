"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const config_1 = require("./database/config");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Language: typescript
dotenv_1.default.config();
const server = new server_1.default();
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Routes
server.routes();
//connect to database
config_1.dbConnection();
//Start the server
server.start();
