import React, { useEffect, useRef } from 'react';

import {
  View,
  Modal as RNModal,
  Pressable,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

import CloseIcon from '../icons/CloseIcon';

const { height: screenHeight } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  showCloseButton?: boolean;
  maxHeight?: number;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdropPress = true,
  showCloseButton = true,
  maxHeight = screenHeight * 0.9,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim, translateYAnim]);

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.8)"
        barStyle="light-content"
      />

      <Animated.View
        className="flex-1 justify-center items-center px-5"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          opacity: opacityAnim,
        }}
      >
        <Pressable
          className="absolute top-0 left-0 right-0 bottom-0"
          onPress={handleBackdropPress}
        />

        <Animated.View
          className="w-full bg-gray-950 rounded-2xl"
          style={{
            maxHeight,
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          }}
        >
          <View className="relative p-6">
            {showCloseButton && (
              <Pressable
                className="absolute top-4 right-4 w-8 h-8 bg-gray-900 rounded-2xl justify-center items-center z-10"
                onPress={onClose}
              >
                <CloseIcon />
              </Pressable>
            )}
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

export default Modal;
