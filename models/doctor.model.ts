import { Schema, model } from "mongoose";

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

DoctorSchema.method('toJSON', function () {
    const { __v,  ...object } = this.toObject();
    return object;
})

export const Doctor = model('Doctor', DoctorSchema);