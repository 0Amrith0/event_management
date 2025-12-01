import { axiosInstance } from "./axios";

export const addNewProfile = async (add) => {
    try {
        const res = await axiosInstance.post("/profile", add);
        return res.data;
    } catch (error) {
        console.log(error, "Error adding profile");
        throw error;
    }

};

export const getProfile = async (profileId) => {
    try {
        const res = await axiosInstance.get(`/profile/${profileId}`);
        return res.data;
    } catch (error) {
        console.log(error, "Error fetching profile");
        throw error;
    }
};

export const getAllProfiles = async () => {
    try {
        const res = await axiosInstance.get("/profile");
        return res.data;
    } catch (error) {
        console.log(error, "Error fetching profiles");
        throw error;
    }
};

export const getEvents = async (profileId) => {
    try {
        const res = await axiosInstance.get(`/events/profile/${profileId}`);
        return res.data;
    } catch (error) {
        console.log(error, "Error fetching events");
        throw error;
    }
}

export const getEvent = async (eventId) => {
    try {
        const res = await axiosInstance.get(`/events/event/${eventId}`);
        return res.data;
    } catch (error) {
        console.log(error, "Error fetching events");
        throw error;
    }

};

export const addNewEvent = async (eventData) => {
    try {
        const res = await axiosInstance.post("/events", eventData);
        return res.data;
    } catch (error) {
        console.log(error, "Error adding new event");
        throw error;
    }
};

export const updateEvent = async (eventId, updateData) => {
    try {
        const res = await axiosInstance.put(`/events/event/${eventId}`, updateData);
        return res.data;
    } catch (error) {
        console.log(error, "Error updating event");
        throw error;
    }
}