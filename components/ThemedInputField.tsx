import React, { ElementType } from 'react';

import { TextInput, View } from 'react-native';

import ThemeButton from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';

type ThemeInputFieldProps = {
  placeholder?: string;
  inputValue?: string;
  onChangeText?: (text: string) => void;
  textButton: string;
  rightButton?: boolean;
  LeftIcon?: ElementType;
};

const ThemeInputField: React.FC<ThemeInputFieldProps> = ({
  placeholder = 'Type here...',
  inputValue,
  onChangeText,
  textButton,
  rightButton,
  LeftIcon,
}) => {
  return (
    <View className="flex flex-row justify-between items-center w-full rounded-md border border-gray-700">
      <TextInput
        className="flex-1 px-4 text-base"
        placeholder={placeholder}
        value={inputValue}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.dark.text.muted}
      />
      {rightButton && (
        <ThemeButton
          variant="primary"
          onPress={() => {}}
          text={textButton}
          LeftIcon={LeftIcon}
        />
      )}
    </View>
  );
};

export default ThemeInputField;
