import { View } from 'react-native';

import { useNavigationState } from '@react-navigation/native';
import { useRouter, useSegments } from 'expo-router';
import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

import ThemedHeader from '@/components/ThemedHeader';
import ThemedTabList from '@/components/ThemedTabList';
import ThemedTabTrigger from '@/components/ThemedTabTrigger';

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();
  const canGoBack = useNavigationState((state) => state.index > 0);

  const currentRoute = segments[segments.length - 1];

  return (
    <View className="flex-1 px-4">
      <ThemedHeader
        currentRoute={currentRoute}
        router={router}
        canGoBack={canGoBack}
      />
      <Tabs>
        <TabSlot />
        <TabList asChild>
          <ThemedTabList>
            <TabTrigger name="home" href="/(tabs)/home" asChild>
              <ThemedTabTrigger />
            </TabTrigger>
            <TabTrigger name="generate" href="/(tabs)/generate" asChild>
              <ThemedTabTrigger />
            </TabTrigger>
            <TabTrigger name="transactions" href="/(tabs)/transactions" asChild>
              <ThemedTabTrigger />
            </TabTrigger>
            <TabTrigger name="profile" href="/(tabs)/profile" asChild>
              <ThemedTabTrigger />
            </TabTrigger>
          </ThemedTabList>
        </TabList>
      </Tabs>
    </View>
  );
}
