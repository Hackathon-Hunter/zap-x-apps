import React, { useEffect, useRef } from 'react';

import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

import { Colors } from '@/constants/Colors';

import Modal from './ThemedModal';
import DownloadFileIcon from '../icons/DownloadIcon';
import ShareIcon from '../icons/ShareIcon';
import ThemeButton from '../ThemedButton';
import { ThemedText } from '../ThemedText';
import GradientSeparator from '../icons/GradientSeparator';

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  qrData: {
    url: string;
    ammount: string;
  };
  onDownloadReceipt?: () => void;
}

type QRCodeRef = {
  toDataURL: (callback: (data: string) => void) => void;
};

const DynamicQRModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  qrData,
  onDownloadReceipt = () => { },
}) => {
  const qrRef = useRef<QRCodeRef>(null);

  const shareReceipt = async () => {
    if (!qrRef.current) {
      ToastAndroid.show('QR Code not generated yet!', ToastAndroid.SHORT);
      return;
    }

    qrRef.current.toDataURL(async (dataURL) => {
      const base64Image = `data:image/png;base64,${dataURL}`;
      await shareQR(base64Image);
    });
  };

  const shareQR = async (base64Image: string) => {
    try {
      const shareOptions = {
        title: 'Share QR Code',
        message: 'Check out this payment QR code',
        url: base64Image,
        type: 'image/png',
      };
      await Share.open(shareOptions);
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      showCloseButton={true}
      title="Dynamic QR"
    >
      <View className="items-center">
        <View style={styles.qrContainer}>
          <QRCode
            value={qrData.url}
            getRef={(c) => (qrRef.current = c)}
            size={200}
          />
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/zapx-logo.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemedText
            color={Colors.dark.text.secondary}
            numbersOnly
            className="text-base font-medium"
          >
            IDR
          </ThemedText>
          <ThemedText
            color={Colors.dark.text.primary}
            numbersOnly
            className="text-4xl font-medium mt-1"
            style={{ textShadowColor: 'white', textShadowRadius: 10 }}
          >
            {qrData.ammount}
          </ThemedText>
        </View>
        <View className="flex flex-row items-end gap-2 mt-4">
          <ThemeButton
            variant="primary"
            onPress={shareReceipt}
            text="Share"
            LeftIcon={ShareIcon}
          />
        </View>
        <View className="flex-row justify-center items-center py-4 bg-black">
          <View className="flex-1 max-w-[100px] mx-2">
            <GradientSeparator />
          </View>
          <ThemedText color={Colors.dark.text.primary}> OR </ThemedText>
          <View className="flex-1 max-w-[100px] mx-2">
            <GradientSeparator />
          </View>
        </View>
        <TouchableOpacity
          onPress={onDownloadReceipt}
          activeOpacity={0.7}
          className="flex-row justify-center items-center bg-black gap-2 p-2 rounded"
        >
          <DownloadFileIcon />
          <ThemedText color={Colors.dark.text.primary}>Download</ThemedText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DynamicQRModal;

const styles = StyleSheet.create({
  qrContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: 60,
    height: 60,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
