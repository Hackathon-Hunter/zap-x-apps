import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import TransactionFilters, {
  FilterValues,
  TransactionStatus,
} from '@/components/ui/TransactionFilters';
import TransactionItemCard from '@/components/ui/TransactionItemCard';
import { Colors, ColorPalette } from '@/constants/Colors';
import { USER_ROLE } from '@/constants/User';

const TRANSACTION_DATA = [
  {
    id: '1',
    type: 'SWAP',
    pair: 'PEPE → IDR',
    amount: 'Rp 100.600',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 16, 2025 - 10:50 PM',
    status: 'Success' as TransactionStatus,
    currency: 'IDR',
  },
  {
    id: '2',
    type: 'SWAP',
    pair: 'BOME → USDT',
    amount: 'USDT 50',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 15, 2025 - 08:29 PM',
    status: 'Success' as TransactionStatus,
    currency: 'USDT',
  },
  {
    id: '3',
    type: 'SWAP',
    pair: 'ETH → BTC',
    amount: '0.025 BTC',
    amountColor: ColorPalette.red,
    date: 'MAY 14, 2025 - 03:15 PM',
    status: 'Failed' as TransactionStatus,
    currency: 'BTC',
  },
  {
    id: '4',
    type: 'SWAP',
    pair: 'LTC → XRP',
    amount: 'XRP 150',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 13, 2025 - 02:45 PM',
    status: 'Success' as TransactionStatus,
    currency: 'XRP',
  },
  {
    id: '5',
    type: 'SWAP',
    pair: 'ADA → DOGE',
    amount: 'DOGE 3000',
    amountColor: ColorPalette.yellow,
    date: 'MAY 12, 2025 - 11:10 AM',
    status: 'Pending' as TransactionStatus,
    currency: 'DOGE',
  },
  {
    id: '6',
    type: 'SWAP',
    pair: 'BNB → DOT',
    amount: 'DOT 5',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 11, 2025 - 09:00 AM',
    status: 'Success' as TransactionStatus,
    currency: 'DOT',
  },
  {
    id: '7',
    type: 'SWAP',
    pair: 'XMR → ZEC',
    amount: 'ZEC 25',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 10, 2025 - 04:20 PM',
    status: 'Success' as TransactionStatus,
    currency: 'ZEC',
  },
  {
    id: '8',
    type: 'SWAP',
    pair: 'SOL → MATIC',
    amount: 'MATIC 40',
    amountColor: ColorPalette.yellow,
    date: 'MAY 09, 2025 - 12:30 PM',
    status: 'Pending' as TransactionStatus,
    currency: 'MATIC',
  },
  {
    id: '9',
    type: 'SWAP',
    pair: 'TRX → USDC',
    amount: 'USDC 75',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 08, 2025 - 06:15 AM',
    status: 'Success' as TransactionStatus,
    currency: 'USDC',
  },
  {
    id: '10',
    type: 'SWAP',
    pair: 'LINK → BUSD',
    amount: 'BUSD 120',
    amountColor: ColorPalette.yellow,
    date: 'MAY 07, 2025 - 07:45 PM',
    status: 'Pending' as TransactionStatus,
    currency: 'BUSD',
  },
  {
    id: '11',
    type: 'SWAP',
    pair: 'FIL → AAVE',
    amount: 'AAVE 10',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 06, 2025 - 03:10 PM',
    status: 'Success' as TransactionStatus,
    currency: 'AAVE',
  },
  {
    id: '12',
    type: 'SWAP',
    pair: 'HODL → DAI',
    amount: 'DAI 200',
    amountColor: ColorPalette.red,
    date: 'MAY 05, 2025 - 05:50 AM',
    status: 'Failed' as TransactionStatus,
    currency: 'DAI',
  },
  {
    id: '13',
    type: 'SWAP',
    pair: 'SHIB → USDT',
    amount: 'USDT 5000',
    amountColor: ColorPalette.green.DEFAULT,
    date: 'MAY 04, 2025 - 08:00 PM',
    status: 'Success' as TransactionStatus,
    currency: 'USDT',
  },
];

const UserTransactionHistory: React.FC = () => {
  const [filters, setFilters] = useState<FilterValues>({
    date: 'Date',
    currency: 'All',
    status: 'All',
  });

  const filteredTransactions = TRANSACTION_DATA.filter((transaction) => {
    const currencyMatch =
      filters.currency === 'All' || transaction.currency === filters.currency;
    const statusMatch =
      filters.status === 'All' || transaction.status === filters.status;

    return currencyMatch && statusMatch;
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
          showStatus={true}
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
                  role={USER_ROLE.USER}
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

export default UserTransactionHistory;
