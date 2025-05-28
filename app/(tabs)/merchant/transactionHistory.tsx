import { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import TransactionFilters, {
  FilterValues,
} from '@/components/ui/TransactionFilters';
import TransactionItemCard from '@/components/ui/TransactionItemCard';
import { Colors, ColorPalette } from '@/constants/Colors';
import { USER_ROLE } from '@/constants/User';

const TRANSACTION_DATA = [
  {
    id: '1',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: 'Rp 100.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 16, 2025 - 10:50 PM',
    currency: 'IDR',
  },
  {
    id: '2',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 15, 2025 - 08:29 PM',
    currency: 'USDT',
  },
  {
    id: '3',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 14, 2025 - 03:15 PM',
    currency: 'BTC',
  },
  {
    id: '4',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 13, 2025 - 02:45 PM',
    currency: 'XRP',
  },
  {
    id: '5',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 12, 2025 - 11:10 AM',
    currency: 'DOGE',
  },
  {
    id: '6',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 11, 2025 - 09:00 AM',
    currency: 'DOT',
  },
  {
    id: '7',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 10, 2025 - 04:20 PM',
    currency: 'ZEC',
  },
  {
    id: '8',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 09, 2025 - 12:30 PM',
    currency: 'MATIC',
  },
  {
    id: '9',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 08, 2025 - 06:15 AM',
    currency: 'USDC',
  },
  {
    id: '10',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 07, 2025 - 07:45 PM',
    currency: 'BUSD',
  },
  {
    id: '11',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 06, 2025 - 03:10 PM',
    currency: 'AAVE',
  },
  {
    id: '12',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 05, 2025 - 05:50 AM',
    currency: 'DAI',
  },
  {
    id: '13',
    type: '0x8754...79C0',
    pair: 'IDR',
    amount: '+Rp 101.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 04, 2025 - 08:00 PM',
    currency: 'USDT',
  },
];

const MerchantTransactionHistory: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    date: 'Date',
    currency: 'All',
    status: 'All',
  });

  const filteredTransactions = TRANSACTION_DATA.filter((transaction) => {
    const currencyMatch =
      filters.currency === 'All' || transaction.currency === filters.currency;
    return currencyMatch;
  });

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 gap-5 flex flex-col"
        showsVerticalScrollIndicator={false}
      >
        <TransactionFilters
          filters={filters}
          onFiltersChange={setFilters}
          showStatus={false}
        />

        <View className="pb-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <View key={transaction.id} className="mb-3">
                <TransactionItemCard
                  type={transaction.type}
                  date={transaction.date}
                  pair={transaction.pair}
                  amount={transaction.amount}
                  amountColor={transaction.amountColor}
                  role={USER_ROLE.MERCHANT}
                />
              </View>
            ))
          ) : (
            <View className="flex-1 justify-center items-center py-20">
              <ThemedText
                color={Colors.dark.text.secondary}
                className="text-center text-base"
              >
                No transactions found for the selected filters
              </ThemedText>
              <ThemedText
                color={Colors.dark.text.secondary}
                className="text-center text-sm mt-2"
              >
                Try adjusting your filter criteria
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MerchantTransactionHistory;
