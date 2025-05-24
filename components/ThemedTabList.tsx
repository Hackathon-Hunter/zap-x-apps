import React from 'react';

import { View } from 'react-native';

import { TabListProps } from 'expo-router/ui';

const ThemedTabList = ({ children }: TabListProps) => {
  return (
    <View className="bg-black h-24 flex flex-row justify-between items-start">
      {children}
    </View>
  );
};

export default ThemedTabList;
