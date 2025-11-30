import Profile from "../models/Profile.js"

export async function getAllProfiles(req, res) {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });
        return res.status(200).json(profiles);
    } catch (error) {
        console.error("Error fetching all the profiles: ", error);
        res.status(500).send("Server Error");
    }
}

export async function getProfile(req, res) {
    try {
        const { profileId } = req.params;

        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        return res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile: ", error);
        res.status(500).send("Server Error");
    }
}

export async function newProfile(req, res) {
    try {
        const { name } = req.body;

        const newProfile = await Profile.create({
            name
        });

        return res.status(201).json(newProfile);

    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).send("Server Error");
    }
} 