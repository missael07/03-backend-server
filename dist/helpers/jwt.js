"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genJWT = (uid, email) => {
    const payload = { uid, email };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.DB_JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err)
                reject('No se pudo generar el token');
            resolve(token);
        });
    });
};
exports.genJWT = genJWT;
