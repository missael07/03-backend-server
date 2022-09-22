"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Route: /api/users
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controller/user.controller");
const validate_jwt_middleware_1 = require("../middleware/validate-jwt.middleware");
const validations_1 = require("../middleware/validations");
const user_controller_2 = require("../controller/user.controller");
const userRoutes = express_1.Router();
userRoutes.get("/", validate_jwt_middleware_1.validateJWT, user_controller_1.getUsers);
userRoutes.get("/impersonate", validate_jwt_middleware_1.validateJWT, user_controller_1.impersonateUser);
userRoutes.get("/user", validate_jwt_middleware_1.validateJWT, user_controller_1.getUser);
userRoutes.post("/", [
    express_validator_1.check("name", "Campo requerido").not().isEmpty(),
    express_validator_1.check("password", "Campo requerido").not().isEmpty(),
    express_validator_1.check("email", "Campo requerido").isEmail(),
    validations_1.validateFields,
], user_controller_1.createUser);
userRoutes.put("/:id", [
    validate_jwt_middleware_1.validateJWT,
    express_validator_1.check("name", "Campo requerido").not().isEmpty(),
    express_validator_1.check("email", "Campo requerido").isEmail(),
    express_validator_1.check("role", "Campo requerido").not().isEmpty(),
    validations_1.validateFields,
], user_controller_1.updateUser);
userRoutes.delete("/:id", validate_jwt_middleware_1.validateJWT, user_controller_1.deleteUser);
userRoutes.post("/change-password", validate_jwt_middleware_1.validateJWT, user_controller_2.changePassword);
exports.default = userRoutes;
