import { Response } from "express";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

import { User } from '../models/user.model';
import { genJWT } from "../helpers/jwt";
import googleVerify from "../helpers/google-verify";

export const login = async (req: any, resp: Response) => {
    try {
        const { email, password } = req.body;
        const userDB = await User.findOne({ email });

        if (!userDB) return resp.status(404).json({ ok: false, msg: 'Validation' });

        const validPassword = compareSync(password, userDB.password);
        
        if(!validPassword) return resp.status(404).json({ ok: false, msg: 'Validation' });

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
            msg: 'Admin'
        })
    }
}

export const loginGoogle = async (req: any, resp: Response) => {
    try {
        
        const token = req.body.token
        const { email, name, picture } = await googleVerify(token);
        
        const userDB = await User.findOne({ email });
        let user;

        if (!userDB) {
            user = new User({
                email,
                name,
                img: picture,
                password: '@@@',
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
            user.img = picture;
        }
        await user.save();

        const tokenUser = await genJWT(user.id, user.email);


        resp.status(200).json({
            ok: true,
            tokenUser
        })
    }
    catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'Token google invalido'
        })
    }
}


export const renewToken = async (req: any, resp: Response) => {
    const { uid, email } = req;
    try {
        
        const token = await genJWT(uid, email);
        const userDB = await User.findById(uid)
        resp.status(200).json({
            ok: true,
            token,
            user: userDB
        })
    } catch (error) {
        
        resp.status(500).json({
            ok: true,
            
            msg: 'Admin'
        })
    }
}

