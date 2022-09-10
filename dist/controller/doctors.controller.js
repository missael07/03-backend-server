"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctors = void 0;
const getDoctors = (req, res) => {
    res.json({
        ok: true,
        msg: 'Doctors'
    });
};
exports.getDoctors = getDoctors;
const createDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'createDoctor'
    });
};
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
