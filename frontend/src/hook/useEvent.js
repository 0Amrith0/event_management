import { getEvents, addNewEvent, updateEvent, getEvent } from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useGetEvents = (profileId) => {
    const events = useQuery({
        queryKey: ["events", profileId],
        queryFn: () => getEvents(profileId),
        enabled: !!profileId,
        retry: 2,
        onError: () => {
            toast.error("Failed to load events");
        }
    });
    return { ...events, isLoading: events.isLoading };
}

export const useGetEvent = (eventId) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
    onError: () => {
            toast.error("Failed to load event details");
        }
  });
};

export const useCreateEvent = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: addNewEvent,
        onSuccess: () => {
            toast.success("Event created successfully!");
            queryClient.invalidateQueries(["events"]);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to create event");
        }
    });
    return { createEvent: mutate };
}

export const useUpdateEvent = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ eventId, updateData }) => updateEvent(eventId, updateData),
        onSuccess: () => {
            toast.success("Event updated successfully!");
            queryClient.invalidateQueries(["events"]);
            queryClient.invalidateQueries(["event"]); 
        },
        onError: (error) => {
            toast.error( `Failed to update event : ${error?.response?.data?.message}`);
        }
    });
    return { updateEvent: mutate };
}