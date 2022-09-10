"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/upload
*/
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const upload_contraller_1 = require("../controller/upload.contraller");
const uploadRoutes = express_1.Router();
// default options
uploadRoutes.use(express_fileupload_1.default());
uploadRoutes.put('/:by/:id', validate_jwt_middleware_1.validateJWT, upload_contraller_1.fileUploadServer);
uploadRoutes.get('/:by/:data', validate_jwt_middleware_1.validateJWT, upload_contraller_1.getImage);
exports.default = uploadRoutes;
