/*
    Route: /api/users
*/
import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  impersonateUser,
  updateUser,
  getUser,
} from "../controller/user.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from "../middleware/validations";
import { changePassword } from "../controller/user.controller";

const userRoutes = Router();

userRoutes.get("/", validateJWT, getUsers);
userRoutes.get("/impersonate", validateJWT, impersonateUser);
userRoutes.get("/user", validateJWT, getUser);

userRoutes.post(
  "/",
  [
    check("name", "Campo requerido").not().isEmpty(),
    check("password", "Campo requerido").not().isEmpty(),
    check("email", "Campo requerido").isEmail(),
    validateFields,
  ],
  createUser
);

userRoutes.put(
  "/:id",
  [
    validateJWT,
    check("name", "Campo requerido").not().isEmpty(),
    check("email", "Campo requerido").isEmail(),
    check("role", "Campo requerido").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

userRoutes.delete("/:id", validateJWT, deleteUser);
userRoutes.post("/change-password", validateJWT, changePassword);



export default userRoutes;