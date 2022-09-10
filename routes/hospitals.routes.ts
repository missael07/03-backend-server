/*
    Route: /api/hospitals
*/
import { Router } from "express";
import { check } from "express-validator";
import { createHospitals, deleteHospitals, getHospitals, updateHospitals } from "../controller/hospitals.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const hospitalsRoutes = Router();


hospitalsRoutes.get('/', getHospitals);

hospitalsRoutes.post('/', createHospitals);


hospitalsRoutes.put('/:id', updateHospitals);

hospitalsRoutes.delete('/:id', deleteHospitals);


export default hospitalsRoutes;