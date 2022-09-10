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
exports.fileUploadServer = void 0;
const uuid_1 = require("uuid");
const fileUploadServer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, by } = req.params;
    const validTypes = ['users', 'hospitals', 'doctors'];
    if (!validTypes.includes(by)) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es un valor asginable'
        });
    }
    ;
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).send({ ok: false, msg: 'No se cargó ningún archivo.' });
    }
    const file = req.files.img;
    const name = file.name.split('.');
    const ext = name[name.length - 1];
    const validExtensions = ['png', 'jpg', 'jpeg'];
    if (!validExtensions.includes(ext))
        return resp.status(400).json({ ok: false, msg: 'No es una extension valida' });
    const fileName = `${uuid_1.v4()}.${ext}`;
    const path = `./uploads/${by}/${fileName}`;
    file.mv(path, (err) => {
        if (err)
            resp.status(500).json({ ok: false, msg: 'Error al cargar la imagen' });
        resp.status(200).json({ ok: true, msg: 'Archivo Cargado Correctamente' });
    });
});
exports.fileUploadServer = fileUploadServer;
