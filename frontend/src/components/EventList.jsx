import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2Icon, Calendar, Users2Icon } from "lucide-react";

import { useGetEvents } from "../hook/useEvent";
import { timezones } from "../utils/timezones";
import { useProfileStore } from "../hook/useProfileStore";
import { useTimezoneStore } from "../hook/useTimezoneStore";
import { convertUtcToTimezone } from "../utils/convertTime";

function EventList() {

  const navigate = useNavigate();

  const activeProfileId = useProfileStore((state) => state.activeProfileId);
  const activeTimezone = useTimezoneStore((state) => state.activeTimezone);

  const { data: events = [], isLoading: isEventsLoading } = useGetEvents(activeProfileId);

  const [selectedTimezone, setSelectedTimezone] = useState(activeTimezone);

  useEffect(() => {
    if (activeTimezone) {
      setSelectedTimezone(activeTimezone);
    }
  }, [activeTimezone]);

  const handleEdit = (eventId) => {
    navigate(`/edit/${eventId}`);
  };

  return (
    <div className="bg-white rounded-lg h-full flex flex-col pt-1 px-2 pb-3 max-h-full overflow-hidden">
      <label className="input input-bordered rounded flex flex-col mb-3 p-3">
        <h2 className="font-bold text-2xl pb-4">Events</h2>
        <span>View in Timezone</span>
        <select
          className="bg-blue-50 rounded-sm py-1"
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
        >
          <option value="">Select timezone...</option>
          {timezones.map((timezone) => (
            <option key={timezone.value} value={timezone.value}>
              {timezone.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex-1 overflow-y-auto">
        {isEventsLoading ? (
          <span> <Loader2Icon size={20} /></span>
        ) : events.length > 0 ? (
          <div className="w-full">
            {events.map((event) => {
              const start = selectedTimezone
                ? convertUtcToTimezone(event.startUtc, selectedTimezone)
                : event.startUtc;

              const end = selectedTimezone
                ? convertUtcToTimezone(event.endUtc, selectedTimezone)
                : event.endUtc;

              const [startDate, startTime] = start.split(" ");
              const [endDate, endTime] = end.split(" ");

              const created = convertUtcToTimezone(event.createdAtUtc, selectedTimezone);
              const updated = convertUtcToTimezone(event.updatedAtUtc, selectedTimezone);

              const [createdDate, createdTime] = created.split(" ");
              const [updatedDate, updatedTime] = updated.split(" ");

              return (
                <div
                  key={event._id}
                  className="p-3 border-b-2 hover:bg-purple-100 rounded"
                >
                  <p className="flex pb-2">
                    <Users2Icon size={20} className="pr-1" />
                    {event.profiles && event.profiles.length > 0
                      ? event.profiles.map((profile) => profile.name).join(", ")
                      : "No profiles"}
                  </p>

                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <p className="flex flex-col gap-0">
                      <span className="font-medium">Start :{" "}{startDate || "—"}</span>
                      <span>{startTime || "—"}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <p className="flex flex-col gap-0">
                      <span className="font-medium">End :{" "}{endDate || "—"}</span>
                      <span>{endTime || "—"}</span>
                    </p>
                  </div>

                  <div className="my-3 border-b border-gray-300"></div>

                  <div className="flex flex-col text-sm text-gray-600 mt-2">
                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Created At :{" "}{" "}{createdDate || "—"} {createdTime || ""}
                      </span>
                      <button className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(event._id)}>
                        Edit
                      </button>
                    </p>

                    <p className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Updated At :{" "}{updatedDate || "—"} {updatedTime || ""}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          <span className="text-gray-500 text-center">No events found</span>
        )}
      </div>
    </div>
  );
}

export default EventList;