import React from 'react';

import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

function GradientSeparator() {
  return (
    <Svg height={3} width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#0A0D12" />
          <Stop offset="50%" stopColor="#414651" />
          <Stop offset="100%" stopColor="#0A0D12" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height={2} fill="url(#grad)" rx={50} ry={50} />
    </Svg>
  );
}

export default GradientSeparator;
