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
        ref: 'User'
    }
});

HospitalSchema.method('toJSON', function () {
    const { __v,  ...object } = this.toObject();
    return object;
})

export const User = model('User', HospitalSchema);