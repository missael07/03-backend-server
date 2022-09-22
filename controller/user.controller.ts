import { Response } from "express";
import { User } from "../models/user.model";
import { genSaltSync, hashSync } from "bcryptjs";
import { genJWT } from "../helpers/jwt";

export const getUsers = async (req: any, resp: Response) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email role isActive img startDate").skip(from).limit(5),
    User.countDocuments(),
  ]);

  resp.json({
    ok: true,
    users,
    total,
  });
};
export const impersonateUser = async (req: any, resp: Response) => {
  const { email, uid } = req.query;
  const token = await genJWT(uid, email);

  const user = await User.findById(uid);
  resp.json({
    ok: true,
    token,
    user,
  });
};

export const getUser = async (req: any, resp: Response) => {
  const { uid } = req.query;
  const user = await User.findById(uid);
  resp.json({
    ok: true,
    user,
  });
};

export const createUser = async (req: any, resp: Response) => {
  const { email, password, name } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return resp.status(400).json({
        ok: false,
        msg: "Exists",
      });

    const user = new User(req.body);

    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    const token = await genJWT(user.id, user.email);
    resp.json({
      ok: true,
      user,
      token,
    });
  } catch (err) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
      err: err,
    });
  }
};

export const updateUser = async (req: any, resp: Response) => {
  try {
    const uid = req.params.id;
    const userDB = await User.findById(uid);

    if (!userDB) return resp.status(404).json({ ok: false, msg: "Found" });

    const { password, email, ...fields } = req.body;
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

export const deleteUser = async (req: any, resp: Response) => {
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

export const changePassword = async (req: any, resp: Response) => {
  const uid = req.uid;
  console.log(uid);
  const userDB = await User.findById(uid);

  if (!userDB) return resp.status(404).json({ ok: false, msg: "Found" });

  const { password } = req.body;

  const salt = genSaltSync();
  const newPassword = hashSync(password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    uid,
    { password: newPassword, firstLogin: false },
    {
      new: true,
    }
  );

  resp.json({
    ok: true,
    user: updatedUser,
  });
};
