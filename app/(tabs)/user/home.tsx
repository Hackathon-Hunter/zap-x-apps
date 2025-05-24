import React from 'react';

import { View, Text } from 'react-native';

import TokenBalance from '@/components/ui/TokenBalance';
import TokenBalanceCarousel from '@/components/ui/TokenBalanceCarousel';

const UserHome = () => {
  return (
    <View>
      <TokenBalanceCarousel />
    </View>
  );
};

export default UserHome;
