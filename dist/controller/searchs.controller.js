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
exports.searchBy = exports.search = void 0;
const doctor_model_1 = require("../models/doctor.model");
const hospital_model_1 = require("../models/hospital.model");
const user_model_1 = require("../models/user.model");
const search = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.params.data;
    const regex = new RegExp(data, 'i');
    const [users, hospitals, doctors] = yield Promise.all([
        user_model_1.User.find({ name: regex }, 'name email img role'),
        hospital_model_1.Hospital.find({ name: regex }, 'name img '),
        doctor_model_1.Doctor.find({ name: regex }, 'name img '),
    ]);
    resp.json({
        ok: true,
        users,
        hospitals,
        doctors
    });
});
exports.search = search;
const searchBy = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.params.data;
    const collection = req.params.by;
    const regex = new RegExp(data, 'i');
    let results = [];
    switch (collection) {
        case 'users':
            results = yield user_model_1.User.find({ name: regex }, 'name email img role');
            break;
        case 'hospitals':
            results = yield hospital_model_1.Hospital.find({ name: regex }, 'name img ').populate('createdBy', 'name');
            break;
        case 'doctors':
            results = yield doctor_model_1.Doctor.find({ name: regex }, 'name email img role').populate('createdBy', 'name').populate('hospital', 'name img');
            break;
        default:
            return resp.status(404).json({
                ok: false,
                msg: 'Found'
            });
    }
    resp.json({
        ok: true,
        results
    });
});
exports.searchBy = searchBy;
