import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

function ArrowLeftIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M17.416 11H4.583m0 0L11 17.417M4.583 11L11 4.583"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
