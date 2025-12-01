import { useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import { timezones } from "../utils/timezones";
import { useCreateEvent } from "../hook/useEvent";
import { useProfileStore } from "../hook/useProfileStore";
import { useTimezoneStore } from "../hook/useTimeZoneStore";
import { useGetAllProfiles, useCreateProfile } from "../hook/useProfile";

function CreateEventForm() {

  const activeProfileId = useProfileStore((state) => state.activeProfileId);
  const setActiveTimezone = useTimezoneStore((state) => state.setActiveTimezone);

  const { data: profiles = [] } = useGetAllProfiles();
  const { createProfile } = useCreateProfile();
  const { createEvent } = useCreateEvent();

  const [newProfileName, setNewProfileName] = useState("");
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    profiles: [],
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    selectedTimezone: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!activeProfileId) {
        toast.error("No active profile to create an event");
        return;
    }

    if (eventData.profiles.length === 0) {
        toast.error("Select at least one profile for the event");
        return;
    }
    createEvent(eventData);
  };

  const handleAddProfile = () => {
    if (!newProfileName.trim()) return;
    createProfile({ name: newProfileName.trim() });
    setNewProfileName("");
  };

  const toggleProfileSelection = (profileId) => {
    setEventData((prev) => ({
      ...prev,
      profiles: prev.profiles.includes(profileId)
        ? prev.profiles.filter((p) => p !== profileId)
        : [...prev.profiles, profileId],
    }));
  };

  return (
    <div className="bg-white rounded-lg w-full h-full max-w-4xl">
      <form className="p-3" onSubmit={handleCreate}>
        <h2 className="font-bold text-2xl pb-4">Create Event</h2>

        <div className="space-y-4 pb-4 w-full">
          <div className="w-full flex flex-col gap-1 relative">
            <span className="font-medium">Profiles</span>

            <div className="input input-bordered rounded flex items-center justify-between bg-blue-50 h-8"
              onClick={() => setOpen(!open)}
            >
              <span className="pl-1 text-gray-600">
                {eventData.profiles.length === 0
                  ? "Select profiles..."
                  : `${eventData.profiles.length} profiles selected`}
              </span>
              <span> <ChevronDown size={18} /> </span>
            </div>

            {open && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-md z-50 p-3 max-h-60 overflow-y-auto">

                {profiles.map((profile) => (
                  <label key={profile._id} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={eventData.profiles.includes(profile._id)}
                      onChange={() => toggleProfileSelection(profile._id)}
                    />
                    {profile.name}
                  </label>
                ))}

                <div className="border-t my-2"></div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 flex-1"
                    placeholder="Add new profile..."
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddProfile}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

          <label className="input input-bordered w-full rounded flex flex-col">
            Timezone
            <select
              className="bg-blue-50 rounded-sm py-1"
              value={eventData.selectedTimezone}
              onChange={(e) => { const timezone = e.target.value
                setEventData({ ...eventData, selectedTimezone: timezone })
                setActiveTimezone(timezone)}}
            >
              <option value="">Select timezone...</option>
              {timezones.map((timezone) => (
                <option key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
          </label>

          <label className="input input-bordered rounded flex flex-col">
            Start Date & Time
            <div className="flex gap-5 w-full">
              <input
                type="date"
                className="flex-1 bg-blue-50 rounded-sm py-1"
                value={eventData.startDate}
                onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
              />
              <input
                type="time"
                className="bg-blue-50 rounded-sm py-1"
                value={eventData.startTime}
                onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
              />
            </div>
          </label>

          <label className="input input-bordered rounded flex flex-col">
            End Date & Time
            <div className="flex gap-5 w-full">
              <input
                type="date"
                className="flex-1 bg-blue-50 rounded-sm py-1"
                value={eventData.endDate}
                onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
              />
              <input
                type="time"
                className="bg-blue-50 rounded-sm py-1"
                value={eventData.endTime}
                onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
              />
            </div>
          </label>
        </div>

        <button className="btn bg-indigo-600 rounded-lg h-10 w-full">
          <span className="text-white p-10">+ Create Event</span>
        </button>
      </form>
    </div>
  );
}

export default CreateEventForm;
