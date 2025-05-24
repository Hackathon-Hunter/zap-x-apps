import * as React from 'react';

import { View } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import TokenBalance from './TokenBalance';

const DATA = [
  { id: '1', token: 'BOME', amount: '2,000', network: 'Ethereum' },
  { id: '2', token: 'SOL', amount: '10,000', network: 'Solana' },
  { id: '3', token: 'BTC', amount: '0.5', network: 'Bitcoin' },
];

const TokenBalanceCarousel = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  return (
    <View className="h-40">
      <Carousel
        ref={ref}
        height={150}
        data={DATA}
        onProgressChange={progress}
        vertical={true}
        renderItem={({ item }) => (
          <View key={item.token} className="py-4">
            <TokenBalance
              token={item.token}
              amount={item.amount}
              network={item.network}
            />
          </View>
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

export default TokenBalanceCarousel;
