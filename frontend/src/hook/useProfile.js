import { addNewProfile, getProfile, getAllProfiles } from "../utils/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useGetAllProfiles = () => {
    const profiles = useQuery({
        queryKey: ["profiles"],
        queryFn: getAllProfiles,
        retry: 2,
        onError: () => {
            toast.error("Failed to load profiles");
        }
    });

    return { ...profiles, isLoading: profiles.isLoading };
}

export const useGetProfile = (profileId) => {
    const profile = useQuery({
        queryKey: ["profile", profileId],
        queryFn: () => getProfile(profileId),
        enabled: !!profileId,
        retry: 2,
        onError: () => {
            toast.error("Failed to load selected profile");
        }
    });
    return { ...profile, isLoading: profile.isLoading };
}

export const useCreateProfile = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: addNewProfile,
        onSuccess: () => {
            toast.success("Profile created successfully!");
            queryClient.invalidateQueries("profiles");
        },
        onError: (error) => {
            toast.error( error?.response?.data?.message || "Could not create profile" );
        }
    });

    return {createProfile: mutate, isPending, error};
}