import React, { useEffect, useState, useCallback } from 'react';

import { Alert, View } from 'react-native';

import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GradientSeparator from '@/components/icons/GradientSeparator';
import UserIcon from '@/components/icons/UserIcon';
import ThemeButton from '@/components/ThemedButton';
import ThemeInputField from '@/components/ThemedInputField';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import useAuthStore from '@/store/authStore';
import { icpAgent, Ed25519KeyIdentity } from '@/utils/icpAgent';

import Modal from './ThemedModal';

interface RegisterModalProps {
  visible: boolean;
  onClose: (principalId?: string) => void;
}

WebBrowser.maybeCompleteAuthSession();

const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [manualEntryMode, setManualEntryMode] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { authenticate, isLoading } = useAuth();
  const { setRole, setLocalPrincipalId } = useAuthStore();

  const handleAuthenticate = async () => {
    const result = await authenticate();

    if (result.success && result.canisterId) {
      console.log(result);
      setPrincipalId(result.canisterId);
      Alert.alert(
        'Success',
        `Authentication successful! Canister ID: ${result.canisterId}`
      );
    } else {
      const errorMessage = result.error || 'Authentication failed';
      console.log(errorMessage);

      Alert.alert('Error', errorMessage);
    }
  };

  // Auth web app URL
  const authWebAppUrl = 'https://zap-web-auth-two.vercel.app/';

  const handleDeepLink = (url: string) => {
    console.log('Received deep link:', url);

    // Parse the URL to extract canisterId if needed
    try {
      const parsedUrl = new URL(url);
      const canisterId = parsedUrl.searchParams.get('canisterId');

      if (canisterId) {
        console.log('Received canisterId:', canisterId);
        // Handle the received canisterId
        setPrincipalId(canisterId);
      }
    } catch (error) {
      console.error('Error parsing deep link:', error);
    }
  };

  useEffect(() => {
    // Handle initial URL when app is opened from a deep link
    const handleInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    // Handle URLs when app is already open
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    handleInitialUrl();

    return () => subscription?.remove();
  }, []);

  // Handle modal close and pass principalId if available
  const handleClose = () => {
    onClose(principalId || undefined);
    // Reset state when closing
    setPrincipalId(null);
    setIsAuthenticating(false);
    setInputValueName('');
    setInputValueEmail('');
  };

  // Handle existing account button press
  const handleExistingAccount = async () => {
    try {
      setIsAuthenticating(true);

      const scheme = 'zapx'; // This should match your app.json scheme
      const redirectUrl = `${scheme}://auth`; // or just `${scheme}`

      console.log('📱 Opening auth with redirect:', redirectUrl);

      const authUrlWithRedirect = `${authWebAppUrl}?redirectUrl=${encodeURIComponent(redirectUrl)}`;

      console.log('📱 Full auth URL:', authUrlWithRedirect);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrlWithRedirect,
        redirectUrl
      );

      console.log('📱 Browser result:', result);
    } catch (error) {
      console.error('Authentication error:', error);
      setIsAuthenticating(false); // Only stop loading on error
    }
  };

  // Function to navigate to dashboard
  const goToDashboard = useCallback(async () => {
    if (isNavigating) return;

    try {
      setIsNavigating(true);
      // Set role as merchant
      setRole('merchant');
      setLocalPrincipalId(principalId || '');
      // Navigate to tabs (dashboard)
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error going to dashboard:', error);
      Alert.alert('Error', 'Failed to access dashboard. Please try again.');
      setIsNavigating(false);
    }
  }, [router, setRole, isNavigating]);

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
        if (result.merchant && result.merchant.principal_id) {
          setPrincipalId(result.merchant.principal_id);
          // Show success message and navigate
          Alert.alert(
            'Success',
            'Merchant registered successfully! Redirecting to dashboard...',
            [
              {
                text: 'OK',
                onPress: () => goToDashboard(),
              },
            ]
          );
        } else {
          Alert.alert('Success', 'Merchant registered successfully!');
          goToDashboard();
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
            readOnly={isRegistering || isNavigating}
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
            readOnly={isRegistering || isNavigating}
          />
        </View>

        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-end gap-2 mt-4">
            <ThemeButton
              variant="primary"
              onPress={handleRegisterMerchant}
              text={
                isNavigating
                  ? 'Going to Dashboard...'
                  : isRegistering
                    ? 'Registering...'
                    : 'Register Merchant'
              }
              RightIcon={ArrowRightIcon}
              disabled={isRegistering || isNavigating}
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
                  onPress={handleAuthenticate}
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
