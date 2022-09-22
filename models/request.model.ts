import { Schema, model } from "mongoose";

const RequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
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
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export const Request = model("Request", RequestSchema);
