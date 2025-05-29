import React, { ElementType } from 'react';

import { View, ScrollView, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

import ArrowDownIcon from '../icons/ArrowDownIcon';

interface FilterDropdownProps {
  selectedValue: string;
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  LeftIcon?: ElementType;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedValue,
  options,
  onSelect,
  isOpen,
  onToggle,
  LeftIcon,
}) => {
  return (
    <View className="flex-1">
      <Pressable
        onPress={onToggle}
        className="border-[0.5px] border-gray-700 bg-black p-3 flex-row justify-between items-center"
      >
        <View className="flex-row items-center gap-3">
          {LeftIcon && <LeftIcon color={Colors.dark.text.primary} />}
          <ThemedText color={Colors.dark.text.primary} className="text-base">
            {selectedValue}
          </ThemedText>
        </View>
        <ArrowDownIcon color={Colors.dark.text.secondary} />
      </Pressable>

      {isOpen && (
        <View className="absolute top-12 left-0 right-0 bg-black border border-gray-700 rounded-md z-10 max-h-40">
          <ScrollView>
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  console.log(option);

                  onSelect(option);
                  onToggle();
                }}
                className="p-3 border-b border-gray-800 last:border-b-0"
              >
                <ThemedText
                  color={
                    selectedValue === option
                      ? Colors.dark.text.primary
                      : Colors.dark.text.secondary
                  }
                  className="text-sm"
                >
                  {option}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default FilterDropdown;
