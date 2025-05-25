import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

interface ZapIconProps extends SvgProps {
  fillColor?: string; // New prop for fill color
}

function ZapIcon({ fillColor = '#717680', ...props }: ZapIconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92486 0 0 4.92487 0 11C0 17.0751 4.92486 22 11 22ZM14.4316 5.12427C14.5987 4.53093 14.0229 4.18007 13.497 4.55472L6.15621 9.78427C5.58592 10.1906 5.67562 11 6.29096 11H8.22399V10.985H11.9914L8.92167 12.0681L7.56839 16.8758C7.40136 17.4691 7.9771 17.8199 8.50301 17.4453L15.8438 12.2158C16.4141 11.8095 16.3243 11 15.709 11H12.7777L14.4316 5.12427Z"
        fill={fillColor} // Use the fillColor prop
      />
    </Svg>
  );
}

export default ZapIcon;
