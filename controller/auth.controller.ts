import { Response } from "express";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

import { User } from '../models/user.model';
import { genJWT } from "../helpers/jwt";

export const login = async (req: any, resp: Response) => {
    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });

        if (!userDB) return resp.status(404).json({ ok: false, msg: 'Correo o Contraseña no validos' });

        const validPassword = compareSync(password, userDB.password);
        
        if(!validPassword) return resp.status(404).json({ ok: false, msg: 'Correo o Contraseña no validos' });

        if (!userDB.isActive) return resp.status(404).json({ ok: false, msg: 'Cuenta desactivada' });
        
        const token = await genJWT(userDB.id, userDB.email);

        resp.status(200).json({
            ok: true,
            token
        })
    }
    catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
