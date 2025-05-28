import { View } from 'react-native';

import { useNavigationState } from '@react-navigation/native';
import { useRouter, useSegments } from 'expo-router';
import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

import FileIcon from '@/components/icons/FileIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import QRIcon from '@/components/icons/QRIcon';
import ThemedHeader from '@/components/ThemedHeader';
import ThemedTabList from '@/components/ThemedTabList';
import ThemedTabTrigger from '@/components/ThemedTabTrigger';
import { USER_ROLE } from '@/constants/User';

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();
  const canGoBack = useNavigationState((state) => state.index > 0);

  const currentRoute = segments[segments.length - 1];

  const role = USER_ROLE.USER;

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

        {/* Merchant Tabs */}
        {role === USER_ROLE.MERCHANT && renderMerchantTabs()}

        {/* User */}
        {role === USER_ROLE.USER && renderUserTabs()}
      </View>
    </View>
  );
}
