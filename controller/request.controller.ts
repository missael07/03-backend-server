import { Response } from "express";
import { User } from "../models/user.model";
import { genSaltSync, hashSync } from "bcryptjs";
import { genJWT } from "../helpers/jwt";
import { Request } from "../models/request.model";
import { start } from "repl";

export const getRequests = async (req: any, resp: Response) => {
  const from = Number(req.query.from) || 0;

  const [requests, total] = await Promise.all([
    Request.find({}, "uid startDate endDate approved requestType")
      .skip(from)
      .limit(10)
      .populate("requester", "name"),
    Request.countDocuments(),
  ]);

  resp.json({
    ok: true,
    requests,
    total,
  });
};

export const getRequestsByUser = async (req: any, resp: Response) => {
  const { id } = req.params;

  console.log(id);
  const [requests, total] = await Promise.all([
    Request.find(
      { requester: id },
      "uid startDate endDate approved requestType"
    ).populate("requester", "name"),
    Request.countDocuments(),
  ]);

  resp.json({
    ok: true,
    requests,
    total,
  });
};

export const getRequest = async (req: any, resp: Response) => {
  const uid = req.params.id;
  const request = await Request.findById(uid);
  resp.json({
    ok: true,
    request,
  });
};

export const createRequest = async (req: any, resp: Response) => {
  const { startDate, requester } = req.body;
  try {
    const requestExists = await Request.findOne({
      startDate,
      status: true,
      requester,
    });
    if (requestExists)
      return resp.status(400).json({
        ok: false,
        msg: "Exists",
      });

    const request = new Request(req.body);

    await request.save();
    resp.status(200).json({
      ok: true,
      msg: "creada",
      requestExists,
      request,
    });
    // const token = await genJWT(user.id, user.email);
    // resp.json({
    //   ok: true,
    //   user,
    //   token,
    // });
  } catch (err) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
      err: err,
    });
  }
};

export const updateRequest = async (req: any, resp: Response) => {
  try {
    const uid = req.params.id;
    const requestDB = await Request.findById(uid);
    console.log(requestDB);
    if (!requestDB) return resp.status(404).json({ ok: false, msg: "Found" });

    const { startDate, approbed, requester, ...fields } = req.body;
    const requestExists = await Request.findOne({
      startDate,
      approbed: "En espera",
      requester,
    });
    if (
      requestDB.startDate !== start &&
      requestExists &&
      requestDB.approved == "En espera"
    )
      return resp.status(400).json({
        ok: false,
        msg: "Exists",
      });
    console.log(fields);
    fields.startDate = startDate;
    const updatedRequest = await Request.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    resp.json({
      ok: true,
      request: updatedRequest,
    });
  } catch (error: any) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
      error,
    });
  }
};

export const deleteRequest = async (req: any, resp: Response) => {
  try {
    const uid = req.params.id;
    const requestDB = await Request.findById(uid);

    if (!requestDB) return resp.status(404).json({ ok: false, msg: "Found" });

    await Request.findByIdAndDelete(uid);
    resp.json({ ok: true, msg: "SuccessDeleted" });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Admin",
    });
  }
};
