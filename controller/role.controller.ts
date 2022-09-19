import { Response } from "express";
import { User } from "../models/user.model";
import { genSaltSync, hashSync } from "bcryptjs";
import { genJWT } from "../helpers/jwt";
import { Role } from "../models/role.model";

export const getRoles = async (req: any, resp: Response) => {
  const roles = await Role.find();
  resp.json({
    ok: true,
    roles,
  });
};

export const createRole = async (req: any, resp: Response) => {
  const { nameRole } = req.body;
  try {
    const role = new Role(req.body);

    await role.save();
    resp.json({
      ok: true,
      role,
    });
  } catch (err) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
    });
  }
};

export const updateRole = async (req: any, resp: Response) => {
  try {
    const uid = req.params.id;
    const userDB = await User.findById(uid);

    if (!userDB) return resp.status(404).json({ ok: false, msg: "Found" });

    const { password, google, email, ...fields } = req.body;
    const emailExists = await User.findOne({ email });
    if (userDB.email !== email && emailExists)
      return resp.status(400).json({
        ok: false,
        msg: "Exists",
      });



    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    resp.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error: any) {
    if (error.error.name.msg.includes("requerido")) {
      resp.status(400).json({
        ok: false,
        msg: "ValidationField",
      });
    } else {
      resp.status(500).json({
        ok: false,
        msg: "Admin",
      });
    }
  }
};

export const deleteRole = async (req: any, resp: Response) => {
  try {
    const uid = req.params.id;
    const userDB = await User.findById(uid);

    if (!userDB) return resp.status(404).json({ ok: false, msg: "Found" });

    await User.findByIdAndDelete(uid);
    resp.json({ ok: true, msg: "SuccessDeleted" });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
    });
  }
};
