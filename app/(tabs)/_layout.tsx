import React from 'react';

import { Text, View } from 'react-native';

import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

import ThemedTabList from '@/components/ThemedTabList';
import ThemedTabTrigger from '@/components/ThemedTabTrigger';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const menus: {
    name: string;
    route: '/home' | '/scan' | '/transactions';
    label: string;
  }[] = [
    {
      name: 'home',
      route: '/home',
      label: 'Home',
    },
    {
      name: 'scan',
      route: '/scan',
      label: 'Scan',
    },
    {
      name: 'transactions',
      route: '/transactions',
      label: 'Transactions',
    },
  ];

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <ThemedTabList>
          {menus.map(({ name, label, route }) => (
            <TabTrigger key={name} name={name} href={route} asChild>
              <ThemedTabTrigger />
            </TabTrigger>
          ))}
        </ThemedTabList>
      </TabList>
    </Tabs>
  );
}
