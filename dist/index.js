"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const server_1 = __importDefault(require("./classes/server"));
const config_1 = require("./database/config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Language: typescript
dotenv_1.default.config();
const server = new server_1.default();
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use(express_1.default.json());
//declare routes
server.app.use('/api/users', user_routes_1.default);
server.app.use('/api/login', auth_routes_1.default);
//connect to database
config_1.dbConnection();
//Start the server
server.start();
