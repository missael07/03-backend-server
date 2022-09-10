"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/doctors
*/
const express_1 = require("express");
const doctors_controller_1 = require("../controller/doctors.controller");
const doctorsRoutes = express_1.Router();
doctorsRoutes.get('/', doctors_controller_1.getDoctors);
doctorsRoutes.post('/', doctors_controller_1.createDoctor);
doctorsRoutes.put('/:id', doctors_controller_1.updateDoctor);
doctorsRoutes.delete('/:id', doctors_controller_1.deleteDoctor);
exports.default = doctorsRoutes;
