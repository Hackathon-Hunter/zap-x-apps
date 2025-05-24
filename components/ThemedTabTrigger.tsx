import React, { ElementType } from 'react';

import { Pressable, View } from 'react-native';

import { TabTriggerSlotProps } from 'expo-router/ui';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

interface ThemedTabTriggerProps
  extends React.PropsWithChildren,
    TabTriggerSlotProps {
  Icon?: ElementType;
}

const ThemedTabTrigger = React.forwardRef<View, ThemedTabTriggerProps>(
  ({ isFocused, onPress, Icon }, ref) => {
    function GradientBackground() {
      return (
        <Svg
          height="100%"
          width="100%"
          fill="none"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Rect width="100%" height="100%" fill="url(#grad)" />
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="0"
              r="100%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity={0.2} />
              <Stop offset="30%" stopColor="#fff" stopOpacity={0.15} />
              <Stop offset="50%" stopColor="#fff" stopOpacity={0.12} />
              <Stop offset="70%" stopColor="#fff" stopOpacity={0.06} />
              <Stop offset="85%" stopColor="#fff" stopOpacity={0.02} />
              <Stop offset="85%" stopColor="#fff" stopOpacity={0.02} />
              <Stop offset="90%" stopColor="#fff" stopOpacity={0.01} />
              <Stop offset="95%" stopColor="#fff" stopOpacity={0.005} />
              <Stop offset="100%" stopColor="#fff" stopOpacity={0} />
            </RadialGradient>
          </Defs>
        </Svg>
      );
    }

    return (
      <Pressable className="w-full h-16 flex-1" ref={ref} onPress={onPress}>
        <View
          className={`w-full h-full items-center justify-center ${isFocused && 'border-t-2 border-t-white '}`}
        >
          {isFocused && <GradientBackground />}
          <View className="shadow-gray-200 shadow-lg">
            {Icon && (
              <Icon
                color={
                  isFocused
                    ? Colors.dark.text.primary
                    : Colors.dark.text.secondary
                }
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  }
);

ThemedTabTrigger.displayName = 'ThemedTabTrigger';

export default ThemedTabTrigger;
