"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/users
*/
const express_1 = require("express");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const request_controller_1 = require("../controller/request.controller");
const request_controller_2 = require("../controller/request.controller");
const requestRoutes = express_1.Router();
requestRoutes.get("/", validate_jwt_middleware_1.validateJWT, request_controller_2.getRequests);
requestRoutes.get("/:id", validate_jwt_middleware_1.validateJWT, request_controller_2.getRequestsByUser);
requestRoutes.get("/request/:id", validate_jwt_middleware_1.validateJWT, request_controller_1.getRequest);
requestRoutes.post("/", validate_jwt_middleware_1.validateJWT, request_controller_2.createRequest);
requestRoutes.put("/:id", [validate_jwt_middleware_1.validateJWT], request_controller_1.updateRequest);
requestRoutes.delete("/:id", validate_jwt_middleware_1.validateJWT, request_controller_1.deleteRequest);
exports.default = requestRoutes;
