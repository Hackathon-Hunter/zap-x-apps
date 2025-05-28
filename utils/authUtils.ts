// utils/authUtils.ts
import useAuthStore from '@/store/authStore';

// Get current role
export const useRole = () => {
    return useAuthStore(state => state.role);
};

// Check if user is merchant
export const useIsMerchant = () => {
    return useAuthStore(state => state.role === 'merchant');
};

// Check if user is regular user
export const useIsUser = () => {
    return useAuthStore(state => state.role === 'user');
};

// Get role actions
export const useRoleActions = () => {
    const { setRole, clearRole } = useAuthStore();
    return { setRole, clearRole };
};

// Check if user has selected a role
export const useHasRole = () => {
    return useAuthStore(state => state.role !== null);
};

/* 
Example usage anywhere in your app:

import { useRole, useIsMerchant, useIsUser, useHasRole } from '@/utils/authUtils';

function MyTabsComponent() {
  const role = useRole(); // 'user' | 'merchant' | null
  const isMerchant = useIsMerchant(); // boolean
  const isUser = useIsUser(); // boolean
  const hasRole = useHasRole(); // boolean
  
  if (!hasRole) {
    return <Text>Please select a role</Text>;
  }
  
  return (
    <View>
      <Text>Welcome {role}!</Text>
      {isMerchant && <MerchantDashboard />}
      {isUser && <UserDashboard />}
    </View>
  );
}
*/