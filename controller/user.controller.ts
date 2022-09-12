import { Response } from "express";
import { User } from "../models/user.model";
import { genSaltSync, hashSync } from "bcryptjs";
import { genJWT } from "../helpers/jwt";

export const getUsers = async (req: any, resp: Response) => {
    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google isActive img')
            .skip(from).limit(5),
        User.countDocuments()
    ]);


    resp.json({
        ok: true,
        users,
        total,
    })
}

export const createUser = async (req: any, resp: Response) => {
    const { email, password, name } = req.body;
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) return resp.status(400).json({
            ok: false,
            msg: 'Exists'
        });
        
        const user = new User(req.body);

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save()

        const token = await genJWT(user.id, user.email);
        resp.json({
            ok: true,
            user,
            token
        })
    }
    catch (err) {
        resp.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }


}

export const updateUser = async (req: any, resp: Response) => {

    try {
        const uid = req.params.id;
        const userDB = await User.findById(uid);

        if (!userDB) return resp.status(404).json({ ok: false, msg: 'Found' });

        const {password, google, email, ...fields} = req.body;
        const emailExists = await User.findOne({ email });
        if (userDB.email !== email && emailExists)  return resp.status(400).json({
            ok: false,
            msg: 'Exists'
        });

        if (!userDB.google) {            
            fields.email = email;
        } else if (userDB.email !== email) {
            
            return resp.status(400).json({
                ok: false,
                msg: 'google'
            });
        }

        
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        resp.json({
            ok: true,
            user: updatedUser
        })

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}

export const deleteUser = async (req: any, resp: Response) => { 
    try {
        const uid = req.params.id;
        const userDB = await User.findById(uid);

        if (!userDB) return resp.status(404).json({ ok: false, msg: 'Found' });
        
        await User.findByIdAndDelete(uid);
        resp.json({ ok: true, msg: 'SuccessDeleted'})
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}
