import React from 'react';

import { View, Text } from 'react-native';

import { TabListProps } from 'expo-router/ui';

const ThemedTabList = ({ children }: TabListProps) => {
  return <View className="bg-black h-40 flex flex-row">{children}</View>;
};

export default ThemedTabList;
