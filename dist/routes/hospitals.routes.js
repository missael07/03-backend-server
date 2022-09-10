"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/hospitals
*/
const express_1 = require("express");
const hospitals_controller_1 = require("../controller/hospitals.controller");
const hospitalsRoutes = express_1.Router();
hospitalsRoutes.get('/', hospitals_controller_1.getHospitals);
hospitalsRoutes.post('/', hospitals_controller_1.createHospitals);
hospitalsRoutes.put('/:id', hospitals_controller_1.updateHospitals);
hospitalsRoutes.delete('/:id', hospitals_controller_1.deleteHospitals);
exports.default = hospitalsRoutes;
