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
import { currencyFormatter } from '@/utils/numberUtils';

interface PaymentSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  qrData: {
    type: 'dynamic';
    merchant: string;
    currency: string;
    amount: string;
    adminFee: string;
    total: string;
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
      title="Dynamic QR"
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

        {isQRReady && (
          <>
            <View className="flex flex-grow items-center justify-center mt-4 mb-6 w-full">
              <View className="bg-gray-800 rounded-xl p-4 mb-6 w-full">
                <ThemedText
                  color={Colors.dark.text.secondary}
                  className="text-sm mb-3"
                >
                  Payment Details
                </ThemedText>

                <View className="space-y-2">
                  {/* ... (keep all your existing payment detail rows) */}
                  <View className="flex-row justify-between">
                    <ThemedText color={Colors.dark.text.secondary} className="text-sm">
                      Merchant
                    </ThemedText>
                    <ThemedText color={Colors.dark.text.primary} className="text-sm font-medium">
                      {qrData.merchant}
                    </ThemedText>
                  </View>

                  <View className="flex-row justify-between">
                    <ThemedText color={Colors.dark.text.secondary} className="text-sm">
                      Amount
                    </ThemedText>
                    <ThemedText color={Colors.dark.text.primary} className="text-sm font-medium">
                      {qrData.currency} {currencyFormatter(Number(qrData.amount))}
                    </ThemedText>
                  </View>

                  <View className="flex-row justify-between">
                    <ThemedText color={Colors.dark.text.secondary} className="text-sm">
                      Admin Fee
                    </ThemedText>
                    <ThemedText color={Colors.dark.text.primary} className="text-sm font-medium">
                      {qrData.currency} {currencyFormatter(Number(qrData.adminFee))}
                    </ThemedText>
                  </View>

                  <View className="h-px bg-gray-700 my-2" />

                  <View className="flex-row justify-between">
                    <ThemedText color={Colors.dark.text.secondary} className="text-sm font-semibold">
                      Total
                    </ThemedText>
                    <ThemedText color={Colors.dark.text.primary} className="text-base font-bold">
                      {qrData.currency} {currencyFormatter(Number(qrData.total))}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>

            {/* Info Text */}
            <ThemedText
              color={Colors.dark.text.secondary}
              className="text-xs text-center mb-6"
            >
              This QR code is valid for one-time use only.
              Please ensure the payer scans it within 15 minutes.
            </ThemedText>

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

export default DynamicQRModal;
