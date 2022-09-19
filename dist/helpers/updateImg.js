"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImg = void 0;
const fs_1 = require("fs");
const user_model_1 = require("../models/user.model");
const removeImg = (oldPath) => {
    if (fs_1.existsSync(oldPath))
        fs_1.unlinkSync(oldPath);
};
const updateImg = (by, id, name) => __awaiter(void 0, void 0, void 0, function* () {
    let oldPath = `./uploads/${by}`;
    switch (by) {
        case "users":
            const user = yield user_model_1.User.findById(id);
            if (!user)
                return false;
            oldPath = `${oldPath}/${user.img}`;
            yield removeImg(oldPath);
            user.img = name;
            yield user.save();
            return true;
        // case 'hospitals':
        //     const hospitals = await Hospital.findById(id);
        //     if (!hospitals) return false;
        //     oldPath = `${oldPath}/${hospitals.img}`;
        //     await removeImg(oldPath);
        //     hospitals.img = name;
        //     await hospitals.save();
        //     return true;
        // case 'doctors':
        //     const doctor = await Doctor.findById(id);
        //     if (!doctor) return false;
        //     oldPath = `${oldPath}/${doctor.img}`;
        //     await removeImg(oldPath);
        //     doctor.img = name;
        //     await doctor.save();
        //     return true;
    }
});
exports.updateImg = updateImg;
