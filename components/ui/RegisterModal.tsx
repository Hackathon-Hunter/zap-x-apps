import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import UserIcon from '@/components/icons/UserIcon';
import ThemeButton from '@/components/ThemedButton';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

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

  // Auth web app URL
  const authWebAppUrl = 'https://zap-web-auth-t8vc.vercel.app/';

  useEffect(() => {
    WebBrowser.warmUpAsync();

    // Handle deep linking when app is opened from external source
    const handleUrl = (event: { url: string }) => {
      console.log('Deep link received:', event.url);
      const url = new URL(event.url);
      const pid = url.searchParams.get('principalId');
      if (pid) {
        console.log('Principal ID from deep link:', pid);
        setPrincipalId(pid);
        setIsAuthenticating(false);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      WebBrowser.coolDownAsync();
      subscription.remove();
    };
  }, []);

  // Handle modal close and pass principalId if available
  const handleClose = () => {
    onClose(principalId || undefined);
    // Reset state when closing
    setPrincipalId(null);
    setIsAuthenticating(false);
  };

  // Handle existing account button press
  const handleExistingAccount = async () => {
    try {
      setIsAuthenticating(true);

      // Create redirect URL for your app
      const redirectUrl = Linking.createURL('auth-callback');
      console.log('Redirect URL:', redirectUrl);

      // Append redirect URL to your auth web app
      const authUrlWithRedirect = `${authWebAppUrl}?redirectUrl=${encodeURIComponent(redirectUrl)}`;
      console.log('Opening auth URL:', authUrlWithRedirect);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrlWithRedirect,
        redirectUrl
      );

      console.log('Auth session result:', result);

      if (result.type === 'success' && result.url) {
        // Parse the returned URL for parameters
        const parsedUrl = Linking.parse(result.url);
        console.log('Parsed URL:', parsedUrl);

        // Extract principalId from query params
        const pid = parsedUrl.queryParams?.principalId as string;

        if (pid) {
          console.log('Authentication successful! Principal ID:', pid);
          setPrincipalId(pid);
        } else {
          console.log('No principalId found in response');
        }
      } else if (result.type === 'dismiss') {
        console.log('User dismissed the browser');

        // Sometimes the URL might still be available even on dismiss
        if (result.url) {
          const parsedUrl = Linking.parse(result.url);
          const pid = parsedUrl.queryParams?.principalId as string;

          if (pid) {
            console.log('Principal ID found on dismiss:', pid);
            setPrincipalId(pid);
          }
        }
      } else {
        console.log('Authentication cancelled or failed:', result);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Show principal ID if we have it
  const displayPrincipalId = principalId
    ? `Principal ID: ${principalId.substring(0, 20)}...`
    : '';

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      showCloseButton={true}
      title="Merchant Information"
    >
      <View className="flex flex-col gap-4">
        {/* Show principal ID if available */}
        {principalId && (
          <View className="bg-green-900 p-3 rounded-md">
            <ThemedText color={Colors.dark.text.primary} className="text-sm">
              ✅ Authentication Successful
            </ThemedText>
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-xs mt-1"
            >
              {displayPrincipalId}
            </ThemedText>
          </View>
        )}

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
              onPress={handleClose}
              text="Continue"
              RightIcon={ArrowRightIcon}
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
                  onPress={handleExistingAccount}
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
