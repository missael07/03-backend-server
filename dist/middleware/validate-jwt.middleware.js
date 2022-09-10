"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(401).json({ ok: false, msg: 'Token invalido' });
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.DB_JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                    next();
                }
                req.uid = decoded.uid;
                req.email = decoded.email;
                resolve(decoded);
                next();
            });
        });
    }
    catch (error) {
        return res.status(401).json({ ok: false, msg: 'Token invalido' });
    }
};
exports.validateJWT = validateJWT;
