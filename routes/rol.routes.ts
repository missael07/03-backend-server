/*
    Route: /api/users
*/
import { Router } from "express";
import { check } from "express-validator";
import { getRoles, createRole, updateRole } from '../controller/role.controller';
import { createUser, deleteUser, getUsers, impersonateUser, updateUser } from "../controller/user.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const roleRoutes = Router();


roleRoutes.get('/', validateJWT, getRoles);
// userRoutes.get('/impersonate',validateJWT, impersonateUser);


roleRoutes.post('/', [
    check('name','Campo requerido').not().isEmpty(),
    validateFields,
], createRole);


roleRoutes.put('/:id', [
    validateJWT,
    check('name', 'Campo requerido').not().isEmpty(),
    validateFields
], updateRole);

// userRoutes.delete('/:id',validateJWT, deleteUser);


export default roleRoutes;