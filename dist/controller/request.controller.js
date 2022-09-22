"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.updateRequest = exports.createRequest = exports.getRequest = exports.getRequestsByUser = exports.getRequests = void 0;
const request_model_1 = require("../models/request.model");
const repl_1 = require("repl");
const getRequests = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const from = Number(req.query.from) || 0;
    const [requests, total] = yield Promise.all([
        request_model_1.Request.find({}, "uid startDate endDate approved requestType")
            .skip(from)
            .limit(10)
            .populate("requester", "name"),
        request_model_1.Request.countDocuments(),
    ]);
    resp.json({
        ok: true,
        requests,
        total,
    });
});
exports.getRequests = getRequests;
const getRequestsByUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const [requests, total] = yield Promise.all([
        request_model_1.Request.find({ requester: id }, "uid startDate endDate approved requestType").populate("requester", "name"),
        request_model_1.Request.countDocuments(),
    ]);
    resp.json({
        ok: true,
        requests,
        total,
    });
});
exports.getRequestsByUser = getRequestsByUser;
const getRequest = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const request = yield request_model_1.Request.findById(uid);
    resp.json({
        ok: true,
        request,
    });
});
exports.getRequest = getRequest;
const createRequest = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, requester } = req.body;
    try {
        const requestExists = yield request_model_1.Request.findOne({
            startDate,
            status: true,
            requester,
        });
        if (requestExists)
            return resp.status(400).json({
                ok: false,
                msg: "Exists",
            });
        const request = new request_model_1.Request(req.body);
        yield request.save();
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
    }
    catch (err) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
            err: err,
        });
    }
});
exports.createRequest = createRequest;
const updateRequest = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const requestDB = yield request_model_1.Request.findById(uid);
        console.log(requestDB);
        if (!requestDB)
            return resp.status(404).json({ ok: false, msg: "Found" });
        const _a = req.body, { startDate, approbed, requester } = _a, fields = __rest(_a, ["startDate", "approbed", "requester"]);
        const requestExists = yield request_model_1.Request.findOne({
            startDate,
            approbed: "En espera",
            requester,
        });
        if (requestDB.startDate !== repl_1.start &&
            requestExists &&
            requestDB.approved == "En espera")
            return resp.status(400).json({
                ok: false,
                msg: "Exists",
            });
        console.log(fields);
        fields.startDate = startDate;
        const updatedRequest = yield request_model_1.Request.findByIdAndUpdate(uid, fields, {
            new: true,
        });
        resp.json({
            ok: true,
            request: updatedRequest,
        });
    }
    catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
            error,
        });
    }
});
exports.updateRequest = updateRequest;
const deleteRequest = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const requestDB = yield request_model_1.Request.findById(uid);
        if (!requestDB)
            return resp.status(404).json({ ok: false, msg: "Found" });
        yield request_model_1.Request.findByIdAndDelete(uid);
        resp.json({ ok: true, msg: "SuccessDeleted" });
    }
    catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
        });
    }
});
exports.deleteRequest = deleteRequest;
