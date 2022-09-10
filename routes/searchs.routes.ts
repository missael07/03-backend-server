/*
    Route: /api/search
*/
import { Router } from "express";
import { search, searchBy } from "../controller/searchs.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";


const searchRoutes = Router();


searchRoutes.get('/:data', validateJWT, search);

searchRoutes.get('/searchBy/:by/:data', validateJWT, searchBy)




export default searchRoutes;