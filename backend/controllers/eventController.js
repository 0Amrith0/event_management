import Event from "../models/Event.js"
import { toUtc } from "../utils/timezone.js";

export async function getEvents(req, res) {
    try {
        const { profileId } = req.params;

        const events = await Event.find({
            profiles: { $in: [profileId] }
        }).populate("profiles", "name")
            .sort({ startUtc: 1 });

        return res.status(200).json(events);

    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Server Error");
    }
}

export const getEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId).populate("profiles");

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching event" });
    }
};

export async function newEvent(req, res) {
    try {
        const { profiles, selectedTimezone, startDate, startTime, endDate, endTime } = req.body;

        if (!profiles || profiles.length === 0) {
            return res.status(400).json({ message: "Select at least one profile" });
        }

        if (!profiles || !selectedTimezone || !startDate || !startTime || !endDate || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);

        if (end <= start) {
            return res.status(400).json({ message: "End date & time must be after start date & time" });
        }

        const startUtc = toUtc(startDate, startTime, selectedTimezone);
        const endUtc = toUtc(endDate, endTime, selectedTimezone);

        const event = await Event.create({
            profiles,
            selectedTimezone,
            startDate,
            startTime,
            endDate,
            endTime,
            startUtc,
            endUtc,
            createdAtUtc: new Date(),
            updatedAtUtc: new Date()
        });

        return res.status(201).json(event);

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send("Server Error");
    }
}

export async function updateEvent(req, res) {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).send("Event not found");

        const update = req.body;

        const { profiles } = update;
        if (!profiles || profiles.length === 0) {
            return res.status(400).json({ message: "Select at least one profile" });
        }

        const start = new Date(`${update.startDate}T${update.startTime}`);
        const end = new Date(`${update.endDate}T${update.endTime}`);

        if (end <= start) {
            return res.status(400).json({ message: "End date & time must be after start date & time" });
        }

        if (update.startDate && update.startTime && update.selectedTimezone) {
            update.startUtc = toUtc(update.startDate, update.startTime, update.selectedTimezone);
        }

        if (update.endDate && update.endTime && update.selectedTimezone) {
            update.endUtc = toUtc(update.endDate, update.endTime, update.selectedTimezone);
        }

        update.updatedAtUtc = new Date();

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            update,
            { new: true }
        );

        return res.status(200).json(updatedEvent)

    } catch (error) {
        console.log("Error updating event:", error);
        res.status(500).send("Server Error");
    }
}
