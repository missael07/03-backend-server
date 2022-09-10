import { Response } from 'express';


export const getHospitals = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'hospitals'
    });
}

export const createHospitals = (req: any, res: Response) => {
    res.json({
        ok: true,
        msg: 'createHospitals'
    });
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