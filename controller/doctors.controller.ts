import { Response } from 'express';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';


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
        res.status(500).json({ok: false, msg: "Admin"});
    }
    
}

export const updateDoctor = async (req: any, res: Response) => {
    try {
        const uid = req.params.id;
        const doctorDB = await Doctor.findById(uid);

        if (!doctorDB) return res.status(404).json({ ok: false, msg: 'Found' });
        
        const { ...fields } = req.body;

        const hospitalBD = await Hospital.findById(fields.hospital);
        if (!hospitalBD) return res.status(404).json({ ok: false, msg: 'Found' });

        const updatedDoctor = await Doctor.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            doctorDB,
            updatedDoctor
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}

export const deleteDoctor = async (req: any, res: Response) => {
    try {
        const uid = req.params.id;
        const doctorBD = await Doctor.findById(uid);
        if (!doctorBD) return res.status(404).json({ ok: false, msg: 'Found' });

        await Doctor.findByIdAndDelete(uid);
        res.json({ ok: true, msg: 'SuccessDeleted'})
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Admin'
        })
    }
}