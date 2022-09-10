/*
    Route: /api/doctors
*/
import { Router } from "express";
import { check } from "express-validator";
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from "../controller/doctors.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from '../middleware/validations';

const doctorsRoutes = Router();


doctorsRoutes.get('/', validateJWT, getDoctors);

doctorsRoutes.post('/',[
    validateJWT,
    check('name', 'Campo requerido').not().isEmpty(),
    check('hospital', 'Id invalido').isMongoId(),
    validateFields
], createDoctor);


doctorsRoutes.put('/:id',[
    validateJWT,
    check('name', 'Campo requerido').not().isEmpty(),
    check('hospital', 'Id invalido').isMongoId(),
    validateFields
], updateDoctor);

doctorsRoutes.delete('/:id',[
    validateJWT,
], deleteDoctor);


export default doctorsRoutes;