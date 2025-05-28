import React, { useState } from 'react';

import { View } from 'react-native';

import FilterDropdown from './FilterDropdown';
import StatusFilter, { TransactionStatus } from './StatusFilter';
import CalendarIcon from '../icons/CalendarIcon';
import WalletIcon from '../icons/WalletIcon';

export interface FilterValues {
  date: string;
  currency: string;
  status: TransactionStatus;
}

interface TransactionFiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  dateOptions?: string[];
  currencyOptions?: string[];
  statusOptions?: TransactionStatus[];
  showStatus: boolean;
}

const DEFAULT_DATE_OPTIONS = [
  'Date',
  'Today',
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
  'Last 6 months',
  'Last year',
  'Custom',
];

const DEFAULT_CURRENCY_OPTIONS = [
  'All',
  'IDR',
  'USDT',
  'BTC',
  'ETH',
  'XRP',
  'DOGE',
  'DOT',
  'ZEC',
  'MATIC',
  'USDC',
  'BUSD',
  'SOL',
  'ADA',
  'LTC',
  'BNB',
];

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFiltersChange,
  dateOptions = DEFAULT_DATE_OPTIONS,
  currencyOptions = DEFAULT_CURRENCY_OPTIONS,
  statusOptions,
  showStatus,
}) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleDateChange = (date: string) => {
    onFiltersChange({ ...filters, date });
  };

  const handleCurrencyChange = (currency: string) => {
    onFiltersChange({ ...filters, currency });
  };

  const handleStatusChange = (status: TransactionStatus) => {
    onFiltersChange({ ...filters, status });
  };

  const closeAllDropdowns = () => {
    setDateDropdownOpen(false);
    setCurrencyDropdownOpen(false);
  };

  return (
    <View>
      <View className="flex-row gap-4 mb-4 relative z-20">
        <FilterDropdown
          selectedValue={filters.date}
          options={dateOptions}
          onSelect={handleDateChange}
          isOpen={dateDropdownOpen}
          onToggle={() => {
            setDateDropdownOpen(!dateDropdownOpen);
            setCurrencyDropdownOpen(false);
          }}
          LeftIcon={CalendarIcon}
        />

        <FilterDropdown
          selectedValue={filters.currency}
          options={currencyOptions}
          onSelect={handleCurrencyChange}
          isOpen={currencyDropdownOpen}
          onToggle={() => {
            setCurrencyDropdownOpen(!currencyDropdownOpen);
            setDateDropdownOpen(false);
          }}
          LeftIcon={WalletIcon}
        />
      </View>

      {showStatus && (
        <StatusFilter
          selectedStatus={filters.status}
          onStatusChange={handleStatusChange}
          statuses={statusOptions}
        />
      )}

      {(dateDropdownOpen || currencyDropdownOpen) && (
        <View
          className="absolute inset-0 z-10"
          onTouchStart={closeAllDropdowns}
        />
      )}
    </View>
  );
};

export default TransactionFilters;
export type { TransactionStatus };
