"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/hospitals
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const hospitals_controller_1 = require("../controller/hospitals.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const validations_1 = require("../middleware/validations");
const hospitalsRoutes = express_1.Router();
hospitalsRoutes.get('/', validate_jwt_middleware_1.validateJWT, hospitals_controller_1.getHospitals);
hospitalsRoutes.post('/', [
    validate_jwt_middleware_1.validateJWT,
    express_validator_1.check('name', 'Campo requerido').not().isEmpty(),
    validations_1.validateFields
], hospitals_controller_1.createHospitals);
hospitalsRoutes.put('/:id', hospitals_controller_1.updateHospitals);
hospitalsRoutes.delete('/:id', hospitals_controller_1.deleteHospitals);
exports.default = hospitalsRoutes;
