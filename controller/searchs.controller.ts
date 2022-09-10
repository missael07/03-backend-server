import { Response } from "express"
import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

export const search = async (req: any, resp: Response) => {
    const data = req.params.data;
    const regex = new RegExp(data, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }, 'name email img role'),
        Hospital.find({ name: regex }, 'name img '),
        Doctor.find({ name: regex }, 'name img '),
    ]);

    resp.json({
        ok: true,
        users,
        hospitals,
        doctors
    })
}

export const searchBy = async (req: any, resp: Response) => {
    const data = req.params.data;
    const collection = req.params.by;
    const regex = new RegExp(data, 'i');

    let results = [];
    switch (collection) {
        case 'users':
            results = await User.find({ name: regex }, 'name email img role');
            break;
        case 'hospitals':
            results = await Hospital.find({ name: regex }, 'name img ').populate('createdBy', 'name');
            
            break;
        case 'doctors':
            results = await Doctor.find({ name: regex }, 'name email img role').populate('createdBy', 'name').populate('hospital', 'name img');
            break;
    
        default:
            return resp.json({
                ok: false,
                msg: 'Tabla de busqueda invalida'
            })
    }

    resp.json({
        ok: true,
        results
    })
}