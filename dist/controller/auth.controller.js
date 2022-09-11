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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.loginGoogle = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../helpers/jwt");
const google_verify_1 = __importDefault(require("../helpers/google-verify"));
const login = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userDB = yield user_model_1.User.findOne({ email });
        if (!userDB)
            return resp.status(404).json({ ok: false, msg: 'Correo o Contraseña no validos' });
        const validPassword = bcryptjs_1.compareSync(password, userDB.password);
        if (!validPassword)
            return resp.status(404).json({ ok: false, msg: 'Correo o Contraseña no validos' });
        if (!userDB.isActive)
            return resp.status(404).json({ ok: false, msg: 'Cuenta desactivada' });
        const token = yield jwt_1.genJWT(userDB.id, userDB.email);
        resp.status(200).json({
            ok: true,
            token
        });
    }
    catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const loginGoogle = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        const { email, name, picture } = yield google_verify_1.default(token);
        const userDB = yield user_model_1.User.findOne({ email });
        let user;
        if (!userDB) {
            user = new user_model_1.User({
                email,
                name,
                img: picture,
                password: '@@@',
                google: true
            });
        }
        else {
            user = userDB;
            user.google = true;
            user.img = picture;
        }
        yield user.save();
        const tokenUser = yield jwt_1.genJWT(user.id, user.email);
        resp.status(200).json({
            ok: true,
            tokenUser
        });
    }
    catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Token google invalido'
        });
    }
});
exports.loginGoogle = loginGoogle;
const renewToken = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, email } = req;
    try {
        const token = yield jwt_1.genJWT(uid, email);
        const userDB = yield user_model_1.User.findById(uid);
        resp.status(200).json({
            ok: true,
            token,
            user: userDB
        });
    }
    catch (error) {
        resp.status(500).json({
            ok: true,
            msg: 'Contacte al administrador'
        });
    }
});
exports.renewToken = renewToken;
