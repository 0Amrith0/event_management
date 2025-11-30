import { getEvents, addNewEvent, updateEvent, getEvent } from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useGetEvents = (profileId) => {
    const events = useQuery({
        queryKey: ["events", profileId],
        queryFn: () => getEvents(profileId),
        enabled: !!profileId,
        retry: 2,
    });
    return { ...events, isLoading: events.isLoading };
}

export const useGetEvent = (eventId) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
  });
};

export const useCreateEvent = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: addNewEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(["events"]);
        }
    });
    return { createEvent: mutate };
}

export const useUpdateEvent = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ eventId, updateData }) => updateEvent(eventId, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries(["events"]);
        }
    });
    return { updateEvent: mutate };
}