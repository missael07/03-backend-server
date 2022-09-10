/*
    Route: /api/login
*/
import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controller/auth.controller";
import { validateFields } from '../middleware/validations';

const authRoutes = Router();


authRoutes.post('/', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields,
    
], login);



export default authRoutes;