import * as React from 'react';

import { View } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { SUPPORTED_TOKENS, Token } from '@/constants/SupportedTokens';
import { getTokenBalance } from '@/utils/getTokenBalance';

import TokenBalance from './TokenBalance';

const TokenBalanceItem = ({
  token,
  walletAddress,
}: {
  token: Token;
  walletAddress: string;
}) => {
  const [balance, setBalance] = React.useState('0');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const result = await getTokenBalance(token, walletAddress);
        if (isMounted) {
          setBalance(result);
        }
      } catch {
        if (isMounted) {
          setBalance('0');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchBalance();
    return () => {
      isMounted = false;
    };
  }, [token, walletAddress]);

  return (
    <View className="py-4">
      <TokenBalance
        token={token.symbol}
        amount={isLoading ? 'Loading...' : balance.toString()}
        network={token.network || 'Ethereum'}
      />
    </View>
  );
};

interface TokenBalanceCarouselProps {
  walletAddress?: string;
  refreshTrigger?: number;
}

const TokenBalanceCarousel: React.FC<TokenBalanceCarouselProps> = ({
  walletAddress = 'DB891b112678e3C6eF021a19DB85c7BBD461e114',
  refreshTrigger = 0,
}) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const carouselItems = React.useMemo(
    () =>
      SUPPORTED_TOKENS.map((token) => ({
        ...token,
        key: `${token.address}-${refreshTrigger}`,
      })),
    [refreshTrigger]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Token }) => (
      <TokenBalanceItem
        key={item.address}
        token={item}
        walletAddress={walletAddress}
      />
    ),
    [walletAddress]
  );

  return (
    <View className="h-40">
      <Carousel
        ref={ref}
        height={150}
        data={carouselItems}
        onProgressChange={progress}
        vertical={true}
        renderItem={renderItem}
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
