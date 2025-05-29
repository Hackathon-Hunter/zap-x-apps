import React, { useState } from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedText } from '../ThemedText';

interface QRWithLogoProps {
  qrData: any;
  size?: number;
  logoSource?: any; // Can be require() for local images or {uri: ''} for remote
  LogoComponent?: React.ComponentType<any>; // For SVG components
  logoSize?: number;
  logoProps?: any; // Props to pass to LogoComponent
  onLoad?: () => void;
  onError?: () => void;
}

const QRWithLogo: React.FC<QRWithLogoProps> = ({
  qrData,
  size = 200,
  logoSource,
  LogoComponent,
  logoSize = 40,
  logoProps = {},
  onLoad,
  onError,
}) => {
  const [isQRLoading, setIsQRLoading] = useState(true);
  const [isLogoLoading, setIsLogoLoading] = useState(logoSource ? true : false);
  const [qrLoadError, setQRLoadError] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);

  const qrValue = JSON.stringify(qrData);
  const qrSize = `${size}x${size}`;

  // Use high error correction level (L=7%, M=15%, Q=25%, H=30%)
  // H level allows up to 30% of QR to be covered
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrValue)}&size=${qrSize}&ecc=H`;

  const handleQRLoad = () => {
    setIsQRLoading(false);
    setQRLoadError(false);
    if (!logoSource || LogoComponent) {
      onLoad?.();
    }
  };

  const handleQRError = () => {
    setIsQRLoading(false);
    setQRLoadError(true);
    onError?.();
  };

  const handleLogoLoad = () => {
    setIsLogoLoading(false);
    setLogoLoadError(false);
    if (!isQRLoading) {
      onLoad?.();
    }
  };

  const handleLogoError = () => {
    setIsLogoLoading(false);
    setLogoLoadError(true);
    // Still call onLoad since QR is readable without logo
    if (!isQRLoading) {
      onLoad?.();
    }
  };

  const isLoading = isQRLoading || (logoSource && isLogoLoading);
  const hasError = qrLoadError;

  const retryLoad = () => {
    setIsQRLoading(true);
    setQRLoadError(false);
    if (logoSource) {
      setIsLogoLoading(true);
      setLogoLoadError(false);
    }
  };

  return (
    <View style={[styles.qrContainer, { width: size, height: size }]}>
      {/* Loading Indicator */}
      {isLoading && (
        <View style={[styles.loadingContainer, { width: size, height: size }]}>
          <ActivityIndicator size="large" color={Colors.dark.text.primary} />
          <ThemedText
            color={Colors.dark.text.secondary}
            className="mt-2 text-sm"
          >
            Loading QR Code...
          </ThemedText>
        </View>
      )}

      {/* Error State */}
      {hasError && (
        <View style={[styles.errorContainer, { width: size, height: size }]}>
          <ThemedText
            color={Colors.dark.text.secondary}
            className="text-center text-sm mb-3"
          >
            Failed to load QR code
          </ThemedText>
          <TouchableOpacity
            onPress={retryLoad}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            <ThemedText color={Colors.dark.text.primary} className="text-sm">
              Retry
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* QR Code Image */}
      <Image
        source={{ uri: qrUrl }}
        style={[
          { width: size, height: size },
          (isLoading || hasError) && styles.hiddenImage,
        ]}
        resizeMode="contain"
        onLoad={handleQRLoad}
        onError={handleQRError}
      />

      {/* Logo Overlay */}
      {(logoSource || LogoComponent) && !hasError && (
        <View
          style={[
            styles.logoContainer,
            {
              width: logoSize + 16,
              height: logoSize + 16,
              opacity: isQRLoading || qrLoadError ? 0 : 1,
            },
          ]}
        >
          <View
            style={[
              styles.logoBorder,
              {
                width: logoSize + 16,
                height: logoSize + 16,
                borderRadius: (logoSize + 16) / 2,
              },
            ]}
          >
            {LogoComponent ? (
              <LogoComponent
                width={logoSize}
                height={logoSize}
                {...logoProps}
              />
            ) : (
              <Image
                source={logoSource}
                style={[styles.logo, { width: logoSize, height: logoSize }]}
                resizeMode="contain"
                onLoad={handleLogoLoad}
                onError={handleLogoError}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default QRWithLogo;

const styles = StyleSheet.create({
  qrContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  hiddenImage: {
    opacity: 0,
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    // Add shadow for better visibility
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    borderRadius: 4,
  },
});
