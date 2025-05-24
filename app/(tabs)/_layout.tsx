import React from 'react';

import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

import ThemedTabList from '@/components/ThemedTabList';
import ThemedTabTrigger from '@/components/ThemedTabTrigger';

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <ThemedTabList>
          <TabTrigger name="home" href="/home" asChild>
            <ThemedTabTrigger />
          </TabTrigger>

          <TabTrigger name="generate" href="/generate" asChild>
            <ThemedTabTrigger />
          </TabTrigger>

          <TabTrigger name="transactions" href="/transactions" asChild>
            <ThemedTabTrigger />
          </TabTrigger>

          <TabTrigger name="profile" href="/profile" asChild>
            <ThemedTabTrigger />
          </TabTrigger>
        </ThemedTabList>
      </TabList>
    </Tabs>
  );
}
