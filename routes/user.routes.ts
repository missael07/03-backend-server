/*
    Route: /api/users
*/
import { Router } from "express";
import { check } from "express-validator";
import { createUser, deleteUser, getUsers, updateUser } from "../controller/user.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const userRoutes = Router();


userRoutes.get('/:IsActive',validateJWT, getUsers);

userRoutes.post('/', [
    check('name','Campo requerido').not().isEmpty(),
    check('password', 'Campo requerido').not().isEmpty(),
    check('email', 'Campo requerido').isEmail(),
    validateFields,
], createUser);


userRoutes.put('/:id', [
    validateJWT,
    check('name','Campo requerido').not().isEmpty(),
    check('email', 'Campo requerido').isEmail(),
    check('rol', 'Campo requerido').not().isEmpty(),
    validateFields
], updateUser);

userRoutes.delete('/:id',validateJWT, deleteUser);


export default userRoutes;