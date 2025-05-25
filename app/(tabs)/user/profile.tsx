import React, { useState } from 'react';

import { View, Text, ScrollView } from 'react-native';

import ChangeIcon from '@/components/icons/ChangeIcon';
import CopyIcon from '@/components/icons/CopyIcon';
import DisconnectIcon from '@/components/icons/DisconnectIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import HelpIcon from '@/components/icons/HelpIcon';
import LanguageIcon from '@/components/icons/LanguageIcon';
import NetworkIcon from '@/components/icons/NetworkIcon';
import NotificationIcon from '@/components/icons/NotificationIcon';
import PenIcon from '@/components/icons/PenIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';
import WalletIcon from '@/components/icons/WalletIcon';
import ZapIcon from '@/components/icons/ZapIcon';
import ThemeButton from '@/components/ThemedButton';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import SettingCardProfile from '@/components/ui/SettingCardProfile';
import { ColorPalette, Colors } from '@/constants/Colors';

// Dummy data
const DUMMY_TRANSACTIONS = [
  {
    type: 'Wallet Management',
    date: 'Import, export, and backup wallet',
    icon: WalletIcon,
  },
  {
    type: 'Network Settings',
    date: 'Manage blockchain networks',
    icon: NetworkIcon,
  },
  {
    type: 'Security',
    date: 'Password, 2FA, and biometrics',
    icon: SecurityIcon,
  },
  {
    type: 'Notifications',
    date: 'Push notifications, transactions alerts and updates',
    icon: NotificationIcon,
  },
  {
    type: 'Language & Region',
    date: 'English, Currency: IDR',
    icon: LanguageIcon,
  },
  {
    type: 'Help & Support',
    date: 'FAQ, contact support',
    icon: HelpIcon,
  },
];

const UserProfile = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ScrollView>
      <View className="flex flex-col gap-2">
        <View className="flex flex-col gap-2">
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            Wallet
          </ThemedText>
          <ThemeInputField
            placeholder="john@gmail.com"
            inputValue={inputValue}
            onChangeText={setInputValue}
            LeftIcon={CopyIcon}
            textButton="Edit"
            rightButton={true}
          />
        </View>
        <ThemeButton
          text="Custom Secondary Button"
          onPress={() => {}}
          variant="secondary"
          LeftIcon={DisconnectIcon}
        />
        <GradientSeparator />
        <View className="flex gap-3">
          {DUMMY_TRANSACTIONS.map((item, i) => (
            <SettingCardProfile
              key={i}
              type={item.type}
              date={item.date}
              LeftIcon={item.icon}
            />
          ))}
        </View>

        <View className="flex flex-col gap-2 justify-center items-center mt-4">
          <ZapIcon />
          <ThemedText color={Colors.dark.text.muted} type="subtitle">
            ZapX v1.0.0
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
