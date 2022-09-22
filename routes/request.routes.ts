/*
    Route: /api/users
*/
import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controller/user.controller";
import { validateJWT } from "../middleware/validate-jwt.middleware";
import { validateFields } from "../middleware/validations";
import {
  updateRequest,
  getRequest,
  deleteRequest,
} from "../controller/request.controller";
import {
  createRequest,
  getRequests,
  getRequestsByUser,
} from "../controller/request.controller";

const requestRoutes = Router();

requestRoutes.get("/", validateJWT, getRequests);
requestRoutes.get("/:id", validateJWT, getRequestsByUser);
requestRoutes.get("/request/:id", validateJWT, getRequest);

requestRoutes.post("/", validateJWT, createRequest);

requestRoutes.put("/:id", [validateJWT], updateRequest);

requestRoutes.delete("/:id", validateJWT, deleteRequest);

export default requestRoutes;
