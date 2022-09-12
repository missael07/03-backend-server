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
exports.getImage = exports.fileUploadServer = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const updateImg_1 = require("../helpers/updateImg");
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
        return resp.status(400).send({ ok: false, msg: 'Load' });
    }
    const file = req.files.img;
    const name = file.name.split('.');
    const ext = name[name.length - 1];
    const validExtensions = ['png', 'jpg', 'jpeg'];
    if (!validExtensions.includes(ext))
        return resp.status(400).json({ ok: false, msg: 'Extension' });
    const fileName = `${uuid_1.v4()}.${ext}`;
    const path = `./uploads/${by}/${fileName}`;
    file.mv(path, (err) => {
        if (err)
            resp.status(500).json({ ok: false, msg: 'LoadFile' });
        updateImg_1.updateImg(by, id, fileName);
        file.mv(`./dist/uploads/${by}/${fileName}`);
        resp.status(200).json({ ok: true, msg: 'Success', fileName });
    });
});
exports.fileUploadServer = fileUploadServer;
const getImage = (req, resp) => {
    const { data, by } = req.params;
    const pathImg = path_1.default.join(__dirname, `../uploads/${by}/${data}`);
    if (!fs_1.existsSync(pathImg))
        return resp.sendFile(path_1.default.join(__dirname, `../uploads/no-img.jpg`));
    resp.sendFile(pathImg);
};
exports.getImage = getImage;
