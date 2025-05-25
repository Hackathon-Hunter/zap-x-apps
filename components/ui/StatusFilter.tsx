import React from 'react';

import { View, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ColorPalette } from '@/constants/Colors';

export type TransactionStatus = 'All' | 'Success' | 'Pending' | 'Failed';

interface StatusFilterProps {
  selectedStatus: TransactionStatus;
  onStatusChange: (status: TransactionStatus) => void;
  statuses?: TransactionStatus[];
}

const DEFAULT_STATUSES: TransactionStatus[] = [
  'All',
  'Success',
  'Pending',
  'Failed',
];

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
  statuses = DEFAULT_STATUSES,
}) => {
  const statusColors: Record<TransactionStatus, string> = {
    All: 'border-gray-500',
    Success: 'border-green-400',
    Pending: 'border-yellow',
    Failed: 'border-red',
  };

  return (
    <View className="flex-row gap-3 mb-4 flex-wrap">
      {statuses.map((status) => (
        <Pressable
          key={status}
          onPress={() => onStatusChange(status)}
          className="flex-row items-center gap-2 p-2 border-[0.5px] border-gray-700"
        >
          <View
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${statusColors[status]}`}
          >
            {selectedStatus === status && (
              <View className="w-2 h-2 bg-white rounded-full" />
            )}
          </View>
          <ThemedText
            color={ColorPalette.white}
            className="text-sm"
            numbersOnly
          >
            {status}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
};

export default StatusFilter;
