"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/login
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controller/auth.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const validations_1 = require("../middleware/validations");
const authRoutes = express_1.Router();
authRoutes.post('/', [
    express_validator_1.check('email', 'Email obligatorio').isEmail(),
    express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
    validations_1.validateFields,
], auth_controller_1.login);
authRoutes.post('/google', [
    express_validator_1.check('token', 'Token google obligatorio').not().isEmpty(),
    validations_1.validateFields,
], auth_controller_1.loginGoogle);
authRoutes.get('/renew', validate_jwt_middleware_1.validateJWT, auth_controller_1.renewToken);
exports.default = authRoutes;
