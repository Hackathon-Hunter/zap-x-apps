import * as React from 'react';

import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function CancelIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <G clipPath="url(#clip0_10094_2832)">
        <Path
          d="M3.697 3.697l10.605 10.605M16.5 9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          stroke="#fff"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10094_2832">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default CancelIcon;
