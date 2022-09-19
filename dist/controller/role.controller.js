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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoles = void 0;
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const getRoles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.Role.find();
    resp.json({
        ok: true,
        roles,
    });
});
exports.getRoles = getRoles;
const createRole = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameRole } = req.body;
    try {
        const role = new role_model_1.Role(req.body);
        yield role.save();
        resp.json({
            ok: true,
            role,
        });
    }
    catch (err) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
        });
    }
});
exports.createRole = createRole;
const updateRole = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const userDB = yield user_model_1.User.findById(uid);
        if (!userDB)
            return resp.status(404).json({ ok: false, msg: "Found" });
        const _a = req.body, { password, google, email } = _a, fields = __rest(_a, ["password", "google", "email"]);
        const emailExists = yield user_model_1.User.findOne({ email });
        if (userDB.email !== email && emailExists)
            return resp.status(400).json({
                ok: false,
                msg: "Exists",
            });
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(uid, fields, {
            new: true,
        });
        resp.json({
            ok: true,
            user: updatedUser,
        });
    }
    catch (error) {
        if (error.error.name.msg.includes("requerido")) {
            resp.status(400).json({
                ok: false,
                msg: "ValidationField",
            });
        }
        else {
            resp.status(500).json({
                ok: false,
                msg: "Admin",
            });
        }
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const userDB = yield user_model_1.User.findById(uid);
        if (!userDB)
            return resp.status(404).json({ ok: false, msg: "Found" });
        yield user_model_1.User.findByIdAndDelete(uid);
        resp.json({ ok: true, msg: "SuccessDeleted" });
    }
    catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
        });
    }
});
exports.deleteRole = deleteRole;
