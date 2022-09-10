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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctors = void 0;
const doctor_model_1 = require("../models/doctor.model");
const hospital_model_1 = require("../models/hospital.model");
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
const updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const doctorDB = yield doctor_model_1.Doctor.findById(uid);
        if (!doctorDB)
            return res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        const fields = __rest(req.body, []);
        const hospitalBD = yield hospital_model_1.Hospital.findById(fields.hospital);
        if (!hospitalBD)
            return res.status(404).json({ ok: false, msg: 'Hospital no encontrado' });
        const updatedDoctor = yield doctor_model_1.Doctor.findByIdAndUpdate(uid, fields, { new: true });
        res.json({
            ok: true,
            doctorDB,
            updatedDoctor
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado Contacte al administrador'
        });
    }
});
exports.updateDoctor = updateDoctor;
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const doctorBD = yield doctor_model_1.Doctor.findById(uid);
        if (!doctorBD)
            return res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        yield doctor_model_1.Doctor.findByIdAndDelete(uid);
        res.json({ ok: true, msg: 'Doctor eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado Contacte al administrador'
        });
    }
});
exports.deleteDoctor = deleteDoctor;
