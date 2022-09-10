import {  Response, NextFunction } from 'express';

import { validationResult } from "express-validator";


export const validateFields = (req: any, resp: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return resp.status(400).json({ ok: false, error: errors.mapped() });
    }
    next();
}