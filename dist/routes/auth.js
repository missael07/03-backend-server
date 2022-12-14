"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/users
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user.controller");
const validations_1 = require("../middleware/validations");
const userRoutes = express_1.Router();
userRoutes.get('/:IsActive', user_controller_1.getUsers);
userRoutes.post('/', [
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    express_validator_1.check('password', 'Campo requerido').not().isEmpty(),
    express_validator_1.check('email', 'Campo requerido').isEmail(),
    validations_1.validateFields,
], user_controller_1.createUser);
userRoutes.put('/:id', [
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    express_validator_1.check('email', 'Campo requerido').isEmail(),
    express_validator_1.check('rol', 'Campo requerido').not().isEmpty(),
    validations_1.validateFields,
], user_controller_1.updateUser);
userRoutes.delete('/:id', user_controller_1.deleteUser);
exports.default = userRoutes;
