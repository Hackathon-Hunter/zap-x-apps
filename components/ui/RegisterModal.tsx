import { useEffect, useState } from 'react';

import { Alert, View } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import UserIcon from '@/components/icons/UserIcon';
import ThemeButton from '@/components/ThemedButton';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { icpAgent, Ed25519KeyIdentity } from '@/utils/icpAgent';

import Modal from './ThemedModal';

interface RegisterModalProps {
  visible: boolean;
  onClose: (principalId?: string) => void;
}

WebBrowser.maybeCompleteAuthSession();

const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onClose }) => {
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const authWebAppUrl = 'https://zap-web-auth-two.vercel.app/';

  const [isMonitoringClipboard, setIsMonitoringClipboard] = useState(false);

  useEffect(() => {
    if (!isMonitoringClipboard) return;

    const checkClipboard = async () => {
      const clipboardContent = await Clipboard.getStringAsync();

      if (clipboardContent?.startsWith('zapx_auth:')) {
        const principalId = clipboardContent.replace('zapx_auth:', '');

        setPrincipalId(principalId);
        setIsAuthenticating(false);
        setIsMonitoringClipboard(false);

        await Clipboard.setStringAsync('');
        return;
      }
    };

    checkClipboard();
    const interval = setInterval(checkClipboard, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isMonitoringClipboard]);

  useEffect(() => {
    if (!isAuthenticating && isMonitoringClipboard) {
      setIsMonitoringClipboard(false);
    }
  }, [isAuthenticating, isMonitoringClipboard]);

  const handleClipboardAuth = async () => {
    setIsAuthenticating(true);
    setIsMonitoringClipboard(true);

    await WebBrowser.openBrowserAsync(authWebAppUrl);
  };

  const handleClose = () => {
    onClose(principalId || undefined);
    setPrincipalId(null);
    setIsAuthenticating(false);
    setInputValueName('');
    setInputValueEmail('');
  };

  const handleRegisterMerchant = async () => {
    if (!inputValueName || !inputValueEmail) {
      Alert.alert('Error', 'Please fill in both name and email fields');
      return;
    }

    try {
      setIsRegistering(true);

      if (!principalId) {
        const testIdentity = Ed25519KeyIdentity.generate();
        await icpAgent.init(testIdentity);
      }
      const result = await icpAgent.registerMerchant(
        inputValueName,
        inputValueEmail
      );

      setIsRegistering(false);

      if (result.success) {
        Alert.alert('Success', 'Merchant registered successfully!');
        if (result.merchant && result.merchant.principal_id) {
          setPrincipalId(result.merchant.principal_id);
        }
      } else {
        Alert.alert('Error', result.error || 'Registration failed');
      }
    } catch (error) {
      setIsRegistering(false);
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
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
            readOnly={false}
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
            readOnly={false}
          />
        </View>

        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-end gap-2 mt-4">
            <ThemeButton
              variant="primary"
              onPress={handleRegisterMerchant}
              text={isRegistering ? 'Registering...' : 'Register Merchant'}
              RightIcon={ArrowRightIcon}
              disabled={isRegistering}
            />
          </View>

          {!manualEntryMode && (
            <>
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
                  onPress={handleClipboardAuth}
                  text={
                    isAuthenticating
                      ? 'Authenticating...'
                      : 'I Have an Internet Identity'
                  }
                  LeftIcon={UserIcon}
                  disabled={isAuthenticating}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RegisterModal;
