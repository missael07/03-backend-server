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
exports.deleteHospitals = exports.updateHospitals = exports.createHospitals = exports.getHospitals = void 0;
const hospital_model_1 = require("../models/hospital.model");
const getHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitals = yield hospital_model_1.Hospital.find().populate('createdBy', 'name email img');
    res.json({
        ok: true,
        hospitals,
    });
});
exports.getHospitals = getHospitals;
const createHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hospital = new hospital_model_1.Hospital(req.body);
        hospital.createdBy = req.uid;
        yield hospital.save();
        res.status(200).json({
            ok: true,
            hospital,
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: "Contacte al administrador" + err });
    }
});
exports.createHospitals = createHospitals;
const updateHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const hospitalBD = yield hospital_model_1.Hospital.findById(uid);
        if (!hospitalBD)
            return res.status(404).json({ ok: false, msg: 'Hospital no encontrado' });
        const fields = __rest(req.body, []);
        const updatedHospital = yield hospital_model_1.Hospital.findByIdAndUpdate(uid, fields, { new: true });
        res.json({
            ok: true,
            updatedHospital
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado Copntacte al administrador'
        });
    }
});
exports.updateHospitals = updateHospitals;
const deleteHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.id;
        const hospitalBD = yield hospital_model_1.Hospital.findById(uid);
        if (!hospitalBD)
            return res.status(404).json({ ok: false, msg: 'Hospital no encontrado' });
        yield hospital_model_1.Hospital.findByIdAndDelete(uid);
        // if (!userDB) return resp.status(404).json({ ok: false, msg: 'Usuario inexistente' });
        // const updatedUser = await User.findByIdAndUpdate(uid, {isActive: false}, {new: true});
        res.json({ ok: true, msg: 'Hospital eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
});
exports.deleteHospitals = deleteHospitals;
