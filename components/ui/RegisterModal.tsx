import React, { useEffect, useState } from 'react';

import {
    View,
} from 'react-native';

import Modal from './ThemedModal';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import ThemeButton from '@/components/ThemedButton';
import GradientSeparator from '@/components/icons/GradientSeparator';
import UserIcon from '@/components/icons/UserIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import { Colors } from '@/constants/Colors';

interface RegisterModalProps {
    visible: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    visible,
    onClose,
}) => {
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueEmail, setInputValueEmail] = useState('');

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            showCloseButton={true}
            title="Merchant Information"
        >
            <View className="flex flex-col gap-4">
                <View className="flex flex-col gap-2">
                    <ThemedText color={Colors.dark.text.muted} type="subtitle">
                        Display Name
                    </ThemedText>
                    <ThemeInputField
                        placeholder="Display Name"
                        inputValue={inputValueName}
                        onChangeText={setInputValueName}
                        rightButton={false}
                        readOnly
                    />
                </View>
                <View className="flex flex-col gap-2">
                    <ThemedText color={Colors.dark.text.muted} type="subtitle">
                        Email
                    </ThemedText>
                    <ThemeInputField
                        placeholder="Email"
                        inputValue={inputValueEmail}
                        onChangeText={setInputValueEmail}
                        rightButton={false}
                        readOnly
                    />
                </View>
                <View className="flex flex-col gap-4">
                    <View className="flex flex-row items-end gap-2 mt-4">
                        <ThemeButton
                            variant="primary"
                            onPress={() => { }}
                            text="Continue"
                            RightIcon={ArrowRightIcon}
                        />
                    </View>
                    <View className="flex flex-row items-center gap-2 mt-4">
                        <View className="flex-1">
                            <GradientSeparator />
                        </View>
                        <ThemedText
                            color={Colors.dark.text.muted}
                            className="text-md font-medium"
                            style={{ paddingHorizontal: 8 }}
                        >
                            OR
                        </ThemedText>
                        <View className="flex-1">
                            <GradientSeparator />
                        </View>
                    </View>
                    <View className="flex flex-row items-end gap-2 mt-4">
                        <ThemeButton
                            variant="primary"
                            onPress={() => { }}
                            text="I Have an Account"
                            LeftIcon={UserIcon}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default RegisterModal;