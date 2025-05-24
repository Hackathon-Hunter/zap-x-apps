import React from 'react';
import { Image, ImageProps, StyleProp, ImageStyle } from 'react-native';

type ThemeImageProps = ImageProps & {
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
};

const ThemeImage: React.FC<ThemeImageProps> = ({
  width = 100,
  height = 100,
  style,
  resizeMode = 'contain',
  ...rest
}) => {
  return (
    <Image
      {...rest}
      style={[{ width, height }, style]}
      resizeMode={resizeMode}
    />
  );
};

export default ThemeImage;
