import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage, zustandStorage } from './storage';

export type AuthState = {
    username: string,
    request_token: string  
}

type UserState = {
    value: AuthState,
    logIn: (value: AuthState) => void,
    logOut: () => void,
}

const auth = {
    username: '',
    request_token: ''
} as AuthState;

export const useUserStore = create(
    persist<UserState>(
        (set, get) => ({
            value: auth,
            logIn: (user: AuthState) => set((state) => (
                {value: user}
            )),
            // logIn: (user: AuthState) => set((state) => {

            //     return { ...state.value, value: user };
            // }),
            logOut: () => set((state) => {
                storage.clearAll();

                return {
                    value: auth
                }
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
)