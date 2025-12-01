import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { timezones } from "../utils/timezones";
import { useGetAllProfiles } from "../hook/useProfile";
import { useGetEvent, useUpdateEvent } from "../hook/useEvent";


function EditPage() {

    const { eventId } = useParams();
    const navigate = useNavigate();

    const { data: event } = useGetEvent(eventId);
    const { updateEvent } = useUpdateEvent();
    const { data: profiles = [] } = useGetAllProfiles();

    const [openProfiles, setOpenProfiles] = useState(false);

    const [formData, setFormData] = useState({
        profiles: [],
        selectedTimezone: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
    });

    useEffect(() => {

        if (!event) return;

        setFormData({
            profiles: event.profiles.map((p) => p._id),
            selectedTimezone: event.selectedTimezone || "",

            startDate: event.startDate,
            startTime: event.startTime,
            endDate: event.endDate,
            endTime: event.endTime,
        });
    }, [event]);

    const toggleProfile = (id) => {
        setFormData((prev) => (
            {
                ...prev, profiles: prev.profiles.includes(id)
                    ? prev.profiles.filter((p) => p !== id)
                    : [...prev.profiles, id],
            }));
    };

    const handleUpdate = () => {
        updateEvent({ eventId, updateData: formData });
        navigate("/");
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"></div>

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      bg-white rounded-lg shadow-lg p-6 w-[420px] z-50"
            >
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>

                <div className="flex flex-col mb-3 relative">
                    Profiles
                    <div
                        className="input input-bordered flex items-center justify-between bg-blue-50 h-8 rounded-md cursor-pointer mt-1"
                        onClick={() => setOpenProfiles(!openProfiles)}
                    >
                        <span className="text-gray-600 pl-2">
                            {formData.profiles.length === 0
                                ? "Select profiles..."
                                : `${formData.profiles.length} selected`}
                        </span>
                        <ChevronDown size={16} />
                    </div>

                    {openProfiles && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-md z-50 p-3 max-h-60 overflow-y-auto">
                            {profiles.map((p) => (
                                <label key={p._id} className="flex items-center gap-2 py-1">
                                    <input
                                        type="checkbox"
                                        checked={formData.profiles.includes(p._id)}
                                        onChange={() => toggleProfile(p._id)}
                                    />
                                    {p.name}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <label className="flex flex-col mb-3">
                    Timezone
                    <select
                        className="input input-bordered bg-blue-50 mt-1 h-8 rounded-md px-2"
                        value={formData.selectedTimezone}
                        onChange={(e) =>
                            setFormData({ ...formData, selectedTimezone: e.target.value })
                        }
                    >
                        {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col mb-3">
                    Start Date & Time
                    <div className="flex gap-3 mt-1">
                        <input
                            type="date"
                            className="input input-bordered bg-blue-50 h-8 rounded-md px-2"
                            value={formData.startDate}
                            onChange={(e) =>
                                setFormData({ ...formData, startDate: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            className="input input-bordered bg-blue-50 h-8 rounded-md px-2"
                            value={formData.startTime}
                            onChange={(e) =>
                                setFormData({ ...formData, startTime: e.target.value })
                            }
                        />
                    </div>
                </label>

                <label className="flex flex-col mb-5">
                    End Date & Time
                    <div className="flex gap-3 mt-1">
                        <input
                            type="date"
                            className="input input-bordered bg-blue-50 h-8 rounded-md px-2"
                            value={formData.endDate}
                            onChange={(e) =>
                                setFormData({ ...formData, endDate: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            className="input input-bordered bg-blue-50 h-8 rounded-md px-2"
                            value={formData.endTime}
                            onChange={(e) =>
                                setFormData({ ...formData, endTime: e.target.value })
                            }
                        />
                    </div>
                </label>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={handleUpdate}
                    >
                        Update Event
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditPage;
