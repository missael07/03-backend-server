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
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctors = void 0;
const doctor_model_1 = require("../models/doctor.model");
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield doctor_model_1.Doctor.find()
        .populate('createdBy', 'name email img')
        .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctors,
    });
});
exports.getDoctors = getDoctors;
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = new doctor_model_1.Doctor(req.body);
        doctor.createdBy = req.uid;
        yield doctor.save();
        res.json({
            ok: true,
            doctor,
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: "Contacte al administrador" + err });
    }
});
exports.createDoctor = createDoctor;
const updateDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    });
};
exports.updateDoctor = updateDoctor;
const deleteDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    });
};
exports.deleteDoctor = deleteDoctor;
