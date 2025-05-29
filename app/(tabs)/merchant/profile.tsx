import React, { useState } from 'react';

import { View, Text, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';

import PenIcon from '@/components/icons/PenIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemeInputField from '@/components/ThemedInputField';
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
    amount: '-Rp 101.600',
    amountColor: ColorPalette.red,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: truncateAddress(address),
    date: 'MAY 16, 2025 - 11:10 PM',
    pair: 'IDR',
    amount: '-Rp 101.600',
    amountColor: ColorPalette.red,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 17, 2025 - 09:30 AM',
    pair: 'IDR',
    amount: '-Rp 101.600',
    amountColor: ColorPalette.red,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 02:00 PM',
    pair: 'IDR',
    amount: '-Rp 101.600',
    amountColor: ColorPalette.red,
    role: USER_ROLE.MERCHANT,
  },
  {
    type: 'SEND',
    date: 'MAY 18, 2025 - 05:45 PM',
    pair: 'IDR',
    amount: '-Rp 101.600',
    amountColor: ColorPalette.red,
    role: USER_ROLE.MERCHANT,
  },
];

const MerchantProfile = () => {
  const router = useRouter();
  const [inputValueName, setInputValueName] = useState('IDRX Money Changer');
  const [inputValueEmail, setInputValueEmail] = useState('idrxmoney@gmail.com');

  const handleToTransaction = () => {
    router.push('/merchant/transactionHistory');
  };

  return (
    <ScrollView>
      <View className="flex flex-col gap-2">
        <View className="flex flex-col gap-2">
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            Display Name
          </ThemedText>
          <ThemeInputField
            placeholder="Name"
            inputValue={inputValueName}
            onChangeText={setInputValueName}
            LeftIcon={PenIcon}
            textButton="Edit"
            rightButton={true}
            readOnly
          />
        </View>
        <View className="flex flex-col gap-2">
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            Email
          </ThemedText>
          <ThemeInputField
            placeholder="Name"
            inputValue={inputValueEmail}
            onChangeText={setInputValueEmail}
            LeftIcon={PenIcon}
            textButton="Edit"
            rightButton={true}
            readOnly
          />
        </View>

        <TokenBalanceMerchant
          token="IDR"
          amount="2,000"
          showGenerateQR={false}
        />

        <View className="flex gap-3 mt-8">
          <View className="flex flex-row justify-between">
            <ThemedText color={Colors.dark.text.muted} type="subtitle">
              Recent Withdrawal
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.primary}
              type="subtitle"
              onPress={handleToTransaction}
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

        <View className="flex flex-col gap-2 justify-center items-center mt-4">
          <ZapIcon />
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            ZapX v1.0.0
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default MerchantProfile;
