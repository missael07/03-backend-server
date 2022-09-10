/*
    Route: /api/login
*/
import { Router } from "express";
import { check } from "express-validator";
import { login, loginGoogle, renewToken } from '../controller/auth.controller';
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const authRoutes = Router();


authRoutes.post('/', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields,
    
], login);

authRoutes.post('/google', [
    check('token', 'Token google obligatorio').not().isEmpty(),
    validateFields,    
], loginGoogle);

authRoutes.get('/renew', validateJWT, renewToken);

export default authRoutes;