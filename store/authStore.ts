// store/authStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Role = 'user' | 'merchant';

interface AuthState {
  role: Role | null;

  // Actions
  setRole: (role: Role) => void;
  clearRole: () => void;
  initializeRole: () => Promise<void>;
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

      // Clear role
      clearRole: () => {
        set({ role: null });
        console.log('Role cleared');
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
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ role: state.role }), // Only persist role
    }
  )
);

export default useAuthStore;
