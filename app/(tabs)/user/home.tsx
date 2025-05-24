import React from 'react';

import { ScrollView, View } from 'react-native';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import QRIcon from '@/components/icons/QRIcon';
import ThemeButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import TokenBalanceCarousel from '@/components/ui/TokenBalanceCarousel';
import TransactionItemCard from '@/components/ui/TransactionItemCard';
import { ColorPalette, Colors } from '@/constants/Colors';

// Dummy data
const DUMMY_TRANSACTIONS = [
  {
    type: 'SEND',
    date: 'MAY 16, 2025 - 10:50 PM',
    pair: 'BOME → USD',
    amount: 'USD 50',
    amountColor: ColorPalette.green.DEFAULT,
  },
  {
    type: 'SEND',
    date: 'MAY 16, 2025 - 11:10 PM',
    pair: 'SOL → USD',
    amount: 'USD 200',
    amountColor: ColorPalette.green.DEFAULT,
  },
  {
    type: 'SEND',
    date: 'MAY 17, 2025 - 09:30 AM',
    pair: 'BTC → IDR',
    amount: 'IDR 1.2',
    amountColor: ColorPalette.green.DEFAULT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 02:00 PM',
    pair: 'ETH → USD',
    amount: 'USD 75',
    amountColor: ColorPalette.green.DEFAULT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 05:45 PM',
    pair: 'SOL → USD',
    amount: 'USD 500',
    amountColor: ColorPalette.green.DEFAULT,
  },
];

const UserHome = () => {
  return (
    <ScrollView>
      <View className="flex gap-6 pb-10">
        <View className="flex gap-6">
          <TokenBalanceCarousel />
          <View>
            <ThemeButton
              variant="primary"
              onPress={() => {}}
              text="Scan to Pay"
              LeftIcon={QRIcon}
            />
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-xs mt-2 text-center"
            >
              Scan merchant QR to start swap and pay
            </ThemedText>
          </View>
        </View>
        <View className="flex gap-3">
          <View className="flex flex-row justify-between">
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-base"
            >
              Recent Transaction
            </ThemedText>
            <ThemedText
              color={ColorPalette.white}
              className="text-sm font-medium"
            >
              See All
            </ThemedText>
          </View>

          {DUMMY_TRANSACTIONS.map((item, i) => (
            <TransactionItemCard
              key={i}
              type={item.type}
              date={item.date}
              pair={item.pair}
              amount={item.amount}
              amountColor={item.amountColor}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default gestureHandlerRootHOC(UserHome);
