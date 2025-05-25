import React from 'react';

import { View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import TokenBalanceMerchant from '@/components/ui/TokenBalanceMerchant';
import TransactionItemCard from '@/components/ui/TransactionItemCard';
import { ColorPalette, Colors } from '@/constants/Colors';
import { USER_ROLE } from '@/constants/User';
import { truncateAddress } from '@/utils/textUtils';

const address = '0x1ABC7154748D1CE5144478CDEB574AE244B939B5';

const DUMMY_TRANSACTIONS = [
  {
    type: truncateAddress(address),
    date: 'MAY 16, 2025 - 10:50 PM',
    pair: 'IDR',
    amount: 'USD 200',
    amountColor: ColorPalette.green.DEFAULT,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: truncateAddress(address),
    date: 'MAY 16, 2025 - 11:10 PM',
    pair: 'IDR',
    amount: 'USD 200',
    amountColor: ColorPalette.green.DEFAULT,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 17, 2025 - 09:30 AM',
    pair: 'IDR',
    amount: 'IDR 1.2',
    amountColor: ColorPalette.green.DEFAULT,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 02:00 PM',
    pair: 'IDR',
    amount: 'USD 75',
    amountColor: ColorPalette.green.DEFAULT,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 05:45 PM',
    pair: 'IDR',
    amount: 'USD 500',
    amountColor: ColorPalette.green.DEFAULT,
    role: USER_ROLE.MERCHANT,
  },
];

const MerchantHome = () => {
  return (
    <ScrollView>
      <View className="flex gap-6 pb-10">
        <View className="flex gap-6">
          <TokenBalanceMerchant token="IDR" amount="2,000" />
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
              role={item.role}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MerchantHome;
