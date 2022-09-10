/*
    Route: /api/upload
*/
import { Router } from "express";
import fileUpload from "express-fileupload";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { fileUploadServer, getImage } from '../controller/upload.contraller';


const uploadRoutes = Router();

// default options
uploadRoutes.use(fileUpload());

uploadRoutes.put('/:by/:id', validateJWT, fileUploadServer);

uploadRoutes.get('/:by/:data',validateJWT, getImage)




export default uploadRoutes;