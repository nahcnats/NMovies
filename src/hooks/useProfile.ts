import { useQuery } from '@tanstack/react-query';

import { getProfile, getProfileProps } from '../services/profile-services';
import { Profile } from '../models/Profile';

export const useProfile = (session_id: getProfileProps) => {
    return useQuery<Profile, Error>({
        queryKey: ['profile', session_id],
        queryFn: () => getProfile(session_id)
    });
};