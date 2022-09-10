import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';


export const validateJWT = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({ ok: false, msg: 'Token invalido' });

        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.DB_JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    reject(err);
                    next();
                }
                req.uid = decoded.uid;
                resolve(decoded);
                next();
            })
        });
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'Token invalido' });
    }   
}

