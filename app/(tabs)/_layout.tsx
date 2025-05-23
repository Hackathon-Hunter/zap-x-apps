import React from 'react';

import { Text, View } from 'react-native';

import { Tabs, TabTrigger, TabSlot, TabList } from 'expo-router/ui';

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
      <TabList
        style={{
          height: 80,
          backgroundColor: 'black',
          flexDirection: 'row',
        }}
      >
        {menus.map(({ name, label, route }) => (
          <TabTrigger
            key={name}
            name={name}
            href={route}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderTopWidth: 2,
                borderTopColor: 'white',
              }}
            >
              <Text style={{ color: 'white' }}>{label}</Text>
            </View>
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}
