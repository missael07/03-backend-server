import { Schema, model } from "mongoose";

const HospitalSchema = new Schema({
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
    }
});

HospitalSchema.method('toJSON', function () {
    const { __v,  ...object } = this.toObject();
    return object;
})

export const Hospital = model('Hospital', HospitalSchema);