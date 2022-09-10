import { Response } from "express"
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { updateImg } from "../helpers/updateImg";
import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

export const fileUploadServer = async (req: any, resp: Response) => {
    const { id, by } = req.params;
    const validTypes = ['users', 'hospitals', 'doctors'];
    if (!validTypes.includes(by)) {
        return resp.status(400).json({
            ok: false,
            msg:'No es un valor asginable'
        })
    };

    if (!req.files || Object.keys(req.files).length === 0) {
    return resp.status(400).send({ok: false, msg: 'No se cargó ningún archivo.'});
    }
    const file = req.files.img;
    const name = file.name.split('.');
    const ext = name[name.length - 1]

    const validExtensions = ['png', 'jpg', 'jpeg'];
    if(!validExtensions.includes(ext)) return resp.status(400).json({ ok: false, msg:'No es una extension valida' })

    const fileName = `${uuidv4()}.${ext}`;

    const path = `./uploads/${by}/${fileName}`;

    file.mv(path, (err: any) => {
        if (err) resp.status(500).json({ ok: false, msg: 'Error al cargar la imagen' });
        updateImg(by, id, fileName);
        file.mv(`./dist/uploads/${by}/${fileName}`);
        resp.status(200).json({ ok: true, msg: 'Archivo Cargado Correctamente' });
    });
}

export const getImage = (req: any, resp: Response) => {
    const { data, by } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${by}/${data}`);

    if(!existsSync(pathImg)) return resp.sendFile(path.join(__dirname, `../uploads/no-img.jpg`))

    resp.sendFile(pathImg);
    
}