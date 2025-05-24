import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { TabTriggerSlotProps } from 'expo-router/ui';
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Rect,
  SvgProps,
  Path,
} from 'react-native-svg';

import { Colors } from '@/constants/Colors';

function ExampleIcon(props: SvgProps) {
  return (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
      <Path
        d="M10.917 22.667h10.666M14.94 3.685L5.897 10.72c-.604.47-.907.705-1.124 1-.193.26-.337.554-.424.866-.099.353-.099.736-.099 1.502v9.646c0 1.494 0 2.24.29 2.811.256.502.664.91 1.166 1.165.57.291 1.317.291 2.81.291h15.467c1.494 0 2.24 0 2.811-.29.502-.256.91-.664 1.165-1.166.291-.57.291-1.317.291-2.81v-9.647c0-.766 0-1.149-.099-1.502a2.665 2.665 0 00-.424-.867c-.217-.294-.52-.529-1.124-1L17.56 3.686c-.469-.364-.703-.546-.961-.616a1.334 1.334 0 00-.697 0c-.26.07-.493.252-.962.616z"
        stroke={props.color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface ThemedTabTriggerProps
  extends React.PropsWithChildren,
    TabTriggerSlotProps {}

const ThemedTabTrigger = React.forwardRef<View, ThemedTabTriggerProps>(
  ({ isFocused, onPress }, ref) => {
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
          <Text className="text-white/70 font-medium">
            <ExampleIcon
              color={
                isFocused
                  ? Colors.dark.text.primary
                  : Colors.dark.text.secondary
              }
            />
          </Text>
        </View>
      </Pressable>
    );
  }
);

ThemedTabTrigger.displayName = 'ThemedTabTrigger';

export default ThemedTabTrigger;
