import { Response } from 'express';


export const getDoctors = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'Doctors'
    });
}

export const createDoctor = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'createDoctor'
    });
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