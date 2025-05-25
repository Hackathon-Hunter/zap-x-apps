import * as React from 'react';

import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CheckIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <G clipPath="url(#clip0_10094_2829)">
        <Path
          d="M5.625 9l2.25 2.25 4.5-4.5M16.5 9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          stroke="#fff"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10094_2829">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CheckIcon;
