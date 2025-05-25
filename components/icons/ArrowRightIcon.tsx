import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function ArrowRightIcon() {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none">
      <Path
        d="M7.5 15.5L12.5 10.5L7.5 5.5"
        stroke="white"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowRightIcon;
