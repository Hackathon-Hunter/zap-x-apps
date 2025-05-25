import React, { ElementType } from 'react';

import { TextInput, View } from 'react-native';

import ThemeButton from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

type ThemeInputFieldProps = {
  placeholder?: string;
  inputValue?: string;
  onChangeText?: (text: string) => void;
  textButton?: string;
  rightButton?: boolean;
  LeftIcon?: ElementType;
  readOnly?: boolean;
  prefix?: string;
};

const ThemeInputField: React.FC<ThemeInputFieldProps> = ({
  placeholder = 'Type here...',
  inputValue,
  onChangeText,
  textButton,
  rightButton,
  LeftIcon,
  readOnly,
  prefix,
}) => {
  return (
    <View className="flex flex-row justify-between items-center w-full rounded-md border-gray-700 border-[0.5px]">
      {prefix && (
        <ThemedText
          color={Colors.dark.text.secondary}
          className="text-sm pl-4"
          numbersOnly
        >
          {prefix}
        </ThemedText>
      )}
      <TextInput
        className="flex-1 px-4 text-base text-white"
        placeholder={placeholder}
        value={inputValue}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.dark.text.muted}
        readOnly={readOnly}
      />
      {rightButton && textButton && (
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
