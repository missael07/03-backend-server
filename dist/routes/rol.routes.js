"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/users
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const role_controller_1 = require("../controller/role.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const validations_1 = require("../middleware/validations");
const roleRoutes = express_1.Router();
roleRoutes.get('/', validate_jwt_middleware_1.validateJWT, role_controller_1.getRoles);
// userRoutes.get('/impersonate',validateJWT, impersonateUser);
roleRoutes.post('/', [
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    validations_1.validateFields,
], role_controller_1.createRole);
roleRoutes.put('/:id', [
    validate_jwt_middleware_1.validateJWT,
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    validations_1.validateFields
], role_controller_1.updateRole);
// userRoutes.delete('/:id',validateJWT, deleteUser);
exports.default = roleRoutes;
