import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true
    }
  ],
  selectedTimezone: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  startUtc: {
    type: Date,
    required: true
  },
  endUtc: {
    type: Date,
    required: true
  },
  createdAtUtc: {
    type: Date,
    default: () => new Date()
  },
  updatedAtUtc: {
    type: Date,
    default: () => new Date()
  }
}, { timestamps: false });


const Event = mongoose.model("Event", eventSchema);

export default Event;