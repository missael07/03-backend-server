import { existsSync, unlink, unlinkSync } from "fs";
import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

const removeImg = (oldPath: string) => {
    if (existsSync(oldPath)) unlinkSync(oldPath);
}

export const updateImg = async (by: string, id: string, name: string) => {
    let oldPath = `./uploads/${by}`;
    switch (by) {
        case 'users':            
            const user = await User.findById(id);
            if (!user) return false;
            oldPath = `${oldPath}/${user.img}`;
            await removeImg(oldPath);
            user.img = name;
            await user.save();
            return true;
        case 'hospitals':
            const hospitals = await Hospital.findById(id);
            if (!hospitals) return false;
            oldPath = `${oldPath}/${hospitals.img}`;           
            await removeImg(oldPath);
            hospitals.img = name;
            await hospitals.save();
            return true;
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) return false;
            oldPath = `${oldPath}/${doctor.img}`;
            await removeImg(oldPath);
            doctor.img = name;
            await doctor.save();
            return true;
        
    }
}