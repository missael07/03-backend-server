import { Response } from 'express';
import { Hospital } from '../models/hospital.model';


export const getHospitals = async (req: any, res: Response) => {
    const hospitals = await Hospital.find().populate('createdBy','name email img');
    res.json({
        ok: true,
        hospitals,
    });
}

export const createHospitals = async (req: any, res: Response) => {    
    
    try {
        
        const hospital = new Hospital(req.body);
        hospital.createdBy = req.uid;
        await hospital.save();
            
        res.status(200).json({
            ok: true,
            hospital,
        });
    }
    catch (err) {
        res.status(500).json({ok: false, msg: "Contacte al administrador" + err});
    }
}

export const updateHospitals = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'updateHospitals'
    });
}

export const deleteHospitals = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'deleteHospitals'
    });
}