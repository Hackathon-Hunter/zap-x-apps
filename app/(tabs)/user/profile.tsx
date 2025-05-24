import React from 'react';

import { View, Text } from 'react-native';

import ThemeButton from '@/components/ThemedButton';

const UserProfile = () => {
  return (
    <View>
      <Text>UserProfile</Text>
      <ThemeButton text="Custom Primary Button" onPress={() => {}} />
      <ThemeButton
        text="Custom Secondary Button"
        onPress={() => {}}
        variant="secondary"
      />
    </View>
  );
};

export default UserProfile;
