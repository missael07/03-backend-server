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
        res.status(500).json({ok: false, msg: "Admin"});
    }
}

export const updateHospitals = async (req: any, res: Response) => {
    try {
        const uid = req.params.id;
        const hospitalBD = await Hospital.findById(uid);

        if (!hospitalBD) return res.status(404).json({ ok: false, msg: 'Found' });
        
        const { ...fields } = req.body;
        const updatedHospital = await Hospital.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            updatedHospital
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}

export const deleteHospitals = async (req: any, res: Response) => {
    try {
        const uid = req.params.id;
        const hospitalBD = await Hospital.findById(uid);
        if (!hospitalBD) return res.status(404).json({ ok: false, msg: 'Found' });

        await Hospital.findByIdAndDelete(uid);

        res.json({ ok: true, msg: 'SuccessDeleted'})
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}