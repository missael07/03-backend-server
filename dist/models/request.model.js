"use strict";
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
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    requester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    requestDate: {
        type: Date,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    approved: {
        type: String,
        default: "En espera",
    },
    comments: {
        type: String,
        required: true,
    },
    responsabilityAcepted: {
        type: Boolean,
        required: true,
    },
    requestType: {
        type: String,
        required: true,
    },
    commingDate: {
        type: String,
        required: true,
    },
    requestTime: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
});
RequestSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    object.uid = _id;
    return object;
});
exports.Request = mongoose_1.model("Request", RequestSchema);
