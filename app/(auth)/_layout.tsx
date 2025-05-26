import { View } from 'react-native';

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <View className="flex-1 px-4">
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="successUser"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
