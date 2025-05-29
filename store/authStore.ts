import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Role = 'user' | 'merchant';

interface AuthState {
    role: Role | null;
    principalId?: string;
    // Actions
    setRole: (role: Role) => void;
    setLocalPrincipalId: (principalId: string) => void;
    clearRole: () => void;
    clearPrincipalId: () => void;
    initializeRole: () => Promise<void>;
    initializePrincipalId?: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            role: null,

            // Set role
            setRole: (role: Role) => {
                set({ role });
                console.log('Role set to:', role);
            },

            setLocalPrincipalId: (principalId: string) => {
                set({ principalId });
                console.log('Principal ID set to:', principalId);
            },

            // Clear role
            clearRole: () => {
                set({ role: null });
                console.log('Role cleared');
            },

            clearPrincipalId: () => {
                set({ principalId: undefined });
                console.log('Principal ID cleared');
            },

            // Initialize role from storage (optional - persist middleware handles this)
            initializeRole: async () => {
                try {
                    const storedRole = await AsyncStorage.getItem('auth-storage');
                    if (storedRole) {
                        const parsed = JSON.parse(storedRole);
                        if (parsed.state?.role) {
                            set({ role: parsed.state.role });
                            console.log('Role initialized from storage:', parsed.state.role);
                        }
                    }
                } catch (error) {
                    console.error('Error initializing role:', error);
                }
            },

            initializePrincipalId: async () => {
                try {
                    const storedPrincipalId = await AsyncStorage.getItem('auth-storage');
                    if (storedPrincipalId) {
                        const parsed = JSON.parse(storedPrincipalId);
                        if (parsed.state?.principalId) {
                            set({ principalId: parsed.state.principalId });
                            console.log(
                                'Principal ID initialized from storage:',
                                parsed.state.principalId
                            );
                        }
                    }
                } catch (error) {
                    console.error('Error initializing principal ID:', error);
                }
            },
        }),
        {
            name: 'auth-storage', // Storage key
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ role: state.role }), // Only persist role
        }
    )
);

export default useAuthStore;
