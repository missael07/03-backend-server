"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/doctors
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const doctors_controller_1 = require("../controller/doctors.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const validations_1 = require("../middleware/validations");
const doctorsRoutes = express_1.Router();
doctorsRoutes.get('/', validate_jwt_middleware_1.validateJWT, doctors_controller_1.getDoctors);
doctorsRoutes.post('/', [
    validate_jwt_middleware_1.validateJWT,
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    express_validator_1.check('hospital', 'Id invalido').isMongoId(),
    validations_1.validateFields
], doctors_controller_1.createDoctor);
doctorsRoutes.put('/:id', [
    validate_jwt_middleware_1.validateJWT,
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    express_validator_1.check('hospital', 'Id invalido').isMongoId(),
    validations_1.validateFields
], doctors_controller_1.updateDoctor);
doctorsRoutes.delete('/:id', [
    validate_jwt_middleware_1.validateJWT,
], doctors_controller_1.deleteDoctor);
exports.default = doctorsRoutes;
