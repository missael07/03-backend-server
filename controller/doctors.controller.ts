import { Response } from 'express';
import { Doctor } from '../models/doctor.model';


export const getDoctors = async (req: any, res: Response) => {
    const doctors = await Doctor.find()
                                .populate('createdBy', 'name email img')
                                .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctors,
    });
}

export const createDoctor = async (req: any, res: Response) => {
    try {
        const doctor = new Doctor(req.body);
        doctor.createdBy = req.uid;
        await doctor.save();
        res.json({
        ok: true,
        doctor,
    });
    } catch (err) {
        res.status(500).json({ok: false, msg: "Contacte al administrador" + err});
    }
    
}

export const updateDoctor = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    });
}

export const deleteDoctor = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    });
}