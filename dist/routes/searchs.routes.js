"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/search
*/
const express_1 = require("express");
const searchs_controller_1 = require("../controller/searchs.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const searchRoutes = express_1.Router();
searchRoutes.get('/:data', validate_jwt_middleware_1.validateJWT, searchs_controller_1.search);
searchRoutes.get('/searchBy/:by/:data', validate_jwt_middleware_1.validateJWT, searchs_controller_1.searchBy);
exports.default = searchRoutes;
