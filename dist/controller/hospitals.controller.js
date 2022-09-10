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
const updateHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateHospitals'
    });
};
exports.updateHospitals = updateHospitals;
const deleteHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteHospitals'
    });
};
exports.deleteHospitals = deleteHospitals;
