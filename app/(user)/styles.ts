import { StyleSheet } from 'react-native';

import { fontStyles } from '@/utils/fontUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balanceCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  balanceLabel: {
    ...fontStyles.base,
    color: '#666',
  },
  balanceAmount: {
    ...fontStyles.h1,
    marginTop: 8,
  },
  transactionsContainer: {
    marginTop: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionDate: {
    ...fontStyles.base,
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    ...fontStyles.mono,
  },
  expense: {
    color: '#E53935',
  },
  income: {
    color: '#43A047',
  },
  statsContainer: {
    marginTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statLabel: {
    ...fontStyles.base,
    color: '#666',
  },
});

export default styles;
