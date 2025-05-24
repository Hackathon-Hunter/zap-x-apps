import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'mono';
  numbersOnly?: boolean;
  color?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  color,
  type = 'default',
  numbersOnly = false,
  ...rest
}: ThemedTextProps) {
  const fontFamily = numbersOnly ? 'GeistMono-Regular' : 'Geist-Regular';

  const fontWeight =
    type === 'defaultSemiBold' || type === 'title' || type === 'subtitle'
      ? numbersOnly
        ? 'GeistMono-Medium'
        : 'Geist-Medium'
      : fontFamily;

  const finalFontFamily = type === 'mono' ? 'GeistMono-Regular' : fontWeight;

  return <Text style={[{ color, fontFamily: finalFontFamily }]} {...rest} />;
}
