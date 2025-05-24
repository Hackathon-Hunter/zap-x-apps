import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { Router } from 'expo-router';

import { formatRouteTitle } from '@/utils/routerUtils';

import ArrowLeftIcon from './icons/ArrowLeftIcon';
import Logo from './icons/Logo';

interface ThemedHeaderProps {
  canGoBack?: boolean;
  currentRoute?: string;
  router: Router;
}

const ThemedHeader = ({
  canGoBack,
  currentRoute,
  router,
}: ThemedHeaderProps) => {
  const renderNormal = () => (
    <View className="justify-center items-center">
      {currentRoute === 'home' ? (
        <Logo />
      ) : (
        <Text className="color-white text-xl font-medium">
          {currentRoute ? formatRouteTitle(currentRoute) : 'App'}
        </Text>
      )}
    </View>
  );

  const renderCanBack = () => (
    <Pressable
      onPress={() => router.back()}
      className="flex flex-row items-center gap-2"
    >
      <ArrowLeftIcon />
      <Text className="color-white text-xl font-medium">
        {currentRoute ? formatRouteTitle(currentRoute) : 'App'}
      </Text>
    </Pressable>
  );

  return (
    <View className="bg-black w-full py-6 px-4 justify-center">
      {canGoBack ? renderCanBack() : renderNormal()}
    </View>
  );
};

export default ThemedHeader;
