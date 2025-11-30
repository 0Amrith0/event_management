import { addNewProfile, getProfile, getAllProfiles } from "../utils/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


export const useGetAllProfiles = () => {
    const profiles = useQuery({
        queryKey: ["profiles"],
        queryFn: getAllProfiles,
        retry: 2,
    });

    return { ...profiles, isLoading: profiles.isLoading };
}

export const useGetProfile = (profileId) => {
    const profile = useQuery({
        queryKey: ["profile", profileId],
        queryFn: () => getProfile(profileId),
        enabled: !!profileId,
        retry: 2,
    });
    return { ...profile, isLoading: profile.isLoading };
}

export const useCreateProfile = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: addNewProfile,
        onSuccess: () => {
            queryClient.invalidateQueries("profiles");
        }
    });

    return {createProfile: mutate, isPending, error};
}