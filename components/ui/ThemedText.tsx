import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'mono';
  numbersOnly?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  numbersOnly = false,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const fontFamily = numbersOnly ? 'GeistMono-Regular' : 'Geist-Regular';

  const fontWeight =
    type === 'defaultSemiBold' || type === 'title' || type === 'subtitle'
      ? numbersOnly
        ? 'GeistMono-Medium'
        : 'Geist-Medium'
      : fontFamily;

  const finalFontFamily = type === 'mono' ? 'GeistMono-Regular' : fontWeight;

  return (
    <Text
      style={[
        { color, fontFamily: finalFontFamily },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'mono' ? styles.mono : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  mono: {
    fontSize: 16,
    lineHeight: 24,
  },
});
