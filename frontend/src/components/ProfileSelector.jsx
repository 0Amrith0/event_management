import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useProfileStore } from "../hook/useProfileStore";
import { useCreateProfile, useGetAllProfiles, useGetProfile } from "../hook/useProfile";

function ProfileSelector() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [add, setAdd] = useState("");

    const activeProfileId = useProfileStore((state) => state.activeProfileId);
    const setActiveProfileId = useProfileStore((state) => state.setActiveProfileId);

    const { data: profile } = useGetProfile(activeProfileId);
    const { data: profiles = [] } = useGetAllProfiles();

    const { createProfile, } = useCreateProfile();

    const handleClick = () => {
        createProfile({ name: add.trim() });
        setAdd("");
    }

    const handleProfileClick = (profileId) => {
        setActiveProfileId(profileId);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)}
                className="flex items-center justify-between rounded-md px-3 py-2 bg-white shadow-sm w-72">
                <span>
                    {activeProfileId && profile ? profile.name : "Select current profile..."}
                </span>
                <ChevronDown size={18} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border p-3 z-50">
                    <input
                        className="w-full border rounded-md px-2 py-1 mb-3"
                        type="text"
                        placeholder="Search current profile..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="max-h-32 overflow-y-auto mb-3">
                        {profiles
                            .filter((profile) =>
                                profile.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((profile) => (
                                <div
                                    key={profile._id}
                                    onClick={() => handleProfileClick(profile._id)}
                                    className="px-3 py-2 rounded-md cursor-pointer hover:bg-purple-100"
                                >
                                    {profile.name}
                                </div>
                            ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a profile"
                            value={add}
                            onChange={(e) => setAdd(e.target.value)}
                            className="flex-1 border rounded-md px-2 py-1"
                        />

                        <button onClick={handleClick}
                            className="btn cursor-pointer px-3 py-1 bg-blue-600 text-white rounded-md">
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileSelector;