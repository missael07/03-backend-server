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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../helpers/jwt");
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
