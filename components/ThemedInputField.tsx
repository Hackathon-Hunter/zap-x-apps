import React, { ElementType } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';

import ThemeButton from '@/components/ThemedButton';


type ThemeInputFieldProps = {
    placeholder?: string;
    inputValue?: string;
    onChangeText?: (text: string) => void;
    textButton?: string;
    disabledButton?: boolean;
    LeftIcon?: ElementType;
};

const ThemeInputField: React.FC<ThemeInputFieldProps> = ({
    placeholder = 'Type here...',
    inputValue,
    onChangeText,
    textButton,
    disabledButton,
    LeftIcon,
}) => {
    return (
        <View className="flex flex-row justify-between items-center w-full rounded-md">
            <TextInput
                className="flex-1 px-4 border border-gray-300 text-base"
                placeholder={placeholder}
                value={inputValue}
                onChangeText={onChangeText}
                placeholderTextColor="#aaa"
            />
            {disabledButton && (
                <ThemeButton
                    variant="primary"
                    onPress={() => { }}
                    text={textButton}
                    LeftIcon={LeftIcon}
                />
            )}
        </View>
    );
};

export default ThemeInputField;
