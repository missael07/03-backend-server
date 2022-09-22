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
exports.changePassword = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.impersonateUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../helpers/jwt");
const getUsers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const from = Number(req.query.from) || 0;
    const [users, total] = yield Promise.all([
        user_model_1.User.find({}, "name email role isActive img startDate").skip(from).limit(5),
        user_model_1.User.countDocuments(),
    ]);
    resp.json({
        ok: true,
        users,
        total,
    });
});
exports.getUsers = getUsers;
const impersonateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, uid } = req.query;
    const token = yield jwt_1.genJWT(uid, email);
    const user = yield user_model_1.User.findById(uid);
    resp.json({
        ok: true,
        token,
        user,
    });
});
exports.impersonateUser = impersonateUser;
const getUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.query;
    const user = yield user_model_1.User.findById(uid);
    resp.json({
        ok: true,
        user,
    });
});
exports.getUser = getUser;
const createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const emailExists = yield user_model_1.User.findOne({ email });
        if (emailExists)
            return resp.status(400).json({
                ok: false,
                msg: "Exists",
            });
        const user = new user_model_1.User(req.body);
        const salt = bcryptjs_1.genSaltSync();
        user.password = bcryptjs_1.hashSync(password, salt);
        yield user.save();
        const token = yield jwt_1.genJWT(user.id, user.email);
        resp.json({
            ok: true,
            user,
            token,
        });
    }
    catch (err) {
        resp.status(500).json({
            ok: false,
            msg: "Admin",
            err: err,
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const userDB = yield user_model_1.User.findById(uid);
        if (!userDB)
            return resp.status(404).json({ ok: false, msg: "Found" });
        const _a = req.body, { password, email } = _a, fields = __rest(_a, ["password", "email"]);
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
exports.updateUser = updateUser;
const deleteUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteUser = deleteUser;
const changePassword = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    console.log(uid);
    const userDB = yield user_model_1.User.findById(uid);
    if (!userDB)
        return resp.status(404).json({ ok: false, msg: "Found" });
    const { password } = req.body;
    const salt = bcryptjs_1.genSaltSync();
    const newPassword = bcryptjs_1.hashSync(password, salt);
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(uid, { password: newPassword, firstLogin: false }, {
        new: true,
    });
    resp.json({
        ok: true,
        user: updatedUser,
    });
});
exports.changePassword = changePassword;
