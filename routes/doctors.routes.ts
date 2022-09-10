/*
    Route: /api/doctors
*/
import { Router } from "express";
import { check } from "express-validator";
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from "../controller/doctors.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const doctorsRoutes = Router();


doctorsRoutes.get('/', getDoctors);

doctorsRoutes.post('/',[
    validateJWT,
    check('name', 'Campo requerido').not().isEmpty(),
    check('hospital', 'Id invalido').isMongoId(),
    validateFields
], createDoctor);


doctorsRoutes.put('/:id', updateDoctor);

doctorsRoutes.delete('/:id', deleteDoctor);


export default doctorsRoutes;