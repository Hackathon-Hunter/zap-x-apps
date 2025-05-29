import React, { useRef, useState } from 'react';

import { ToastAndroid, TouchableOpacity, View } from 'react-native';

import Share from 'react-native-share';

import { Colors } from '@/constants/Colors';

import Modal from './ThemedModal';
import DownloadFileIcon from '../icons/DownloadIcon';
import GradientSeparator from '../icons/GradientSeparator';
import ShareIcon from '../icons/ShareIcon';
import ZapIcon from '../icons/ZapIcon'; // Import your ZapIcon
import ThemeButton from '../ThemedButton';
import { ThemedText } from '../ThemedText';
import QRWithLogo from './QRWithLogo'; // Import the new component

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  qrData: {
    type: 'static';
    merchant: string;
    currency: string;
    adminFee: string;
  };
  onDownloadReceipt?: () => void;
}

type QRCodeRef = {
  toDataURL: (callback: (data: string) => void) => void;
};

const StaticQRModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  qrData,
  onDownloadReceipt = () => { },
}) => {
  const qrRef = useRef<QRCodeRef>(null);
  const [isQRReady, setIsQRReady] = useState(false);

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

  const handleQRLoad = () => {
    setIsQRReady(true);
  };

  const handleQRError = () => {
    setIsQRReady(false);
  };

  // Reset QR ready state when modal opens
  React.useEffect(() => {
    if (visible) {
      setIsQRReady(false);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      showCloseButton={true}
      title="Static QR"
    >
      <View className="items-center mt-4">
        {/* QR Code with ZapIcon Logo */}
        <QRWithLogo
          qrData={qrData}
          size={200}
          LogoComponent={ZapIcon}
          logoSize={40}
          logoProps={{
            color: Colors.dark.text.primary, // or any color you want
            // You can pass any other props your ZapIcon accepts
          }}
          onLoad={handleQRLoad}
          onError={handleQRError}
        />

        {/* Action Buttons - Only show when QR is ready */}
        {isQRReady && (
          <>
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
          </>
        )}
      </View>
    </Modal>
  );
};

export default StaticQRModal;
