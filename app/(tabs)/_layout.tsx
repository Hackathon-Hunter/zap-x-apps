import { useEffect, useState } from 'react';

import { View } from 'react-native';

import { useNavigationState } from '@react-navigation/native';
import { useRouter, useSegments } from 'expo-router';
import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

import FileIcon from '@/components/icons/FileIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import QRIcon from '@/components/icons/QRIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemedHeader from '@/components/ThemedHeader';
import ThemedTabList from '@/components/ThemedTabList';
import ThemedTabTrigger from '@/components/ThemedTabTrigger';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import useAuthStore from '@/store/authStore';
import useWalletStore from '@/store/walletStore';

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();
  const canGoBack = useNavigationState((state) => state.index > 0);
  const currentRoute = segments[segments.length - 1];

  const { role } = useAuthStore();
  const { isConnected } = useWalletStore();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        console.log('TabLayout: Checking auth and role:', {
          role,
          isConnected,
        });

        if (!role) {
          console.log('TabLayout: No role found, redirecting to login');
          router.replace('/(auth)/login');
          return;
        }

        if (role && !isConnected) {
          console.log(
            'TabLayout: Role exists but wallet not connected, clearing role and redirecting'
          );
          const { clearRole } = useAuthStore.getState();
          clearRole();
          router.replace('/(auth)/login');
          return;
        }

        if (role && isConnected) {
          console.log('TabLayout: User authenticated with role:', role);
          setIsCheckingAuth(false);
          return;
        }

        console.log('TabLayout: Fallback redirect to login');
        router.replace('/(auth)/login');
      } catch (error) {
        console.error('TabLayout: Error checking auth:', error);
        setAuthError('Authentication error occurred');
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndRole();
  }, [role, isConnected, router]);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ZapIcon width={40} height={40} fillColor={Colors.dark.text.primary} />
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-xl font-medium mt-4"
        >
          Loading...
        </ThemedText>
      </View>
    );
  }

  // Show error if auth check failed
  if (authError) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-4">
        <ZapIcon width={40} height={40} fillColor={Colors.dark.text.primary} />
        <ThemedText
          color={Colors.dark.text.primary}
          className="text-xl font-medium mt-4 text-center"
        >
          Authentication Error
        </ThemedText>
        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-base mt-2 text-center"
        >
          {authError}
        </ThemedText>
      </View>
    );
  }

  const renderMerchantTabs = () => (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <ThemedTabList>
          <TabTrigger name="home" href="/(tabs)/merchant/home" asChild>
            <ThemedTabTrigger Icon={HomeIcon} />
          </TabTrigger>
          <TabTrigger
            name="generateQR"
            href="/(tabs)/merchant/generateQR"
            asChild
          >
            <ThemedTabTrigger Icon={QRIcon} />
          </TabTrigger>
          <TabTrigger
            name="transactionHistory"
            href="/(tabs)/merchant/transactionHistory"
            asChild
          >
            <ThemedTabTrigger Icon={FileIcon} />
          </TabTrigger>
          <TabTrigger name="profile" href="/(tabs)/merchant/profile" asChild>
            <ThemedTabTrigger Icon={ProfileIcon} />
          </TabTrigger>
        </ThemedTabList>
      </TabList>
    </Tabs>
  );

  const renderUserTabs = () => (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <ThemedTabList>
          <TabTrigger name="home" href="/(tabs)/user/home" asChild>
            <ThemedTabTrigger Icon={HomeIcon} />
          </TabTrigger>
          <TabTrigger name="scanToPay" href="/(tabs)/user/scanToPay" asChild>
            <ThemedTabTrigger Icon={QRIcon} />
          </TabTrigger>
          <TabTrigger
            name="transactionHistory"
            href="/(tabs)/user/transactionHistory"
            asChild
          >
            <ThemedTabTrigger Icon={FileIcon} />
          </TabTrigger>
          <TabTrigger name="profile" href="/(tabs)/user/profile" asChild>
            <ThemedTabTrigger Icon={ProfileIcon} />
          </TabTrigger>
        </ThemedTabList>
      </TabList>
    </Tabs>
  );

  return (
    <View className="flex-1 bg-black">
      <View className="px-4 flex-1">
        <ThemedHeader
          currentRoute={currentRoute}
          router={router}
          canGoBack={canGoBack}
        />

        {/* Debug Info - Remove in production */}
        {__DEV__ && (
          <View className="mb-2 p-2 bg-gray-800 rounded">
            <ThemedText color={Colors.dark.text.secondary} className="text-xs">
              Debug: Role: {role || 'None'} | Connected:{' '}
              {isConnected ? 'Yes' : 'No'}
            </ThemedText>
          </View>
        )}

        {/* Merchant Tabs */}
        {role === 'merchant' && renderMerchantTabs()}

        {/* User Tabs */}
        {role === 'user' && renderUserTabs()}

        {/* Fallback - shouldn't reach here if auth checks work properly */}
        {role !== 'merchant' && role !== 'user' && (
          <View className="flex-1 justify-center items-center">
            <ThemedText
              color={Colors.dark.text.primary}
              className="text-xl font-medium"
            >
              Invalid Role
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-base mt-2"
            >
              Please login again
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
}
