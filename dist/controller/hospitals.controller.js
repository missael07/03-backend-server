"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHospitals = exports.updateHospitals = exports.createHospitals = exports.getHospitals = void 0;
const getHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'hospitals'
    });
};
exports.getHospitals = getHospitals;
const createHospitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'createHospitals'
    });
};
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
