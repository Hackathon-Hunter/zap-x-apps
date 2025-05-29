import { useEffect, useState } from 'react';

import { View } from 'react-native';

import { useNavigationState } from '@react-navigation/native';
import { Stack, Redirect, useRouter, useSegments } from 'expo-router';

import ThemedHeader from '@/components/ThemedHeader';

import { getCurrentUser, Role } from '../../constants/auth';

export default function MerchantLayout() {
  const router = useRouter();
  const segments = useSegments();
  const canGoBack = useNavigationState((state) => state.index > 0);

  const currentRoute = segments[segments.length - 1];

  const [user, setUser] = useState<{ role: Role; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return null;

  // if (!user || user.role !== 'merchant') {
  //   return <Redirect href="/(auth)/login" />;
  // }

  return (
    <View className="flex-1 px-4">
      <ThemedHeader
        currentRoute={currentRoute}
        router={router}
        canGoBack={canGoBack}
      />
      <Stack>
        <Stack.Screen
          name="transactionDetails"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
