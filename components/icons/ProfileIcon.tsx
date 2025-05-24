import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function ProfileIcon(props: SvgProps) {
  return (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
      <Path
        d="M27.416 28c0-1.86 0-2.791-.23-3.548a5.334 5.334 0 00-3.555-3.556c-.757-.23-1.687-.23-3.548-.23h-6.667c-1.86 0-2.79 0-3.548.23a5.333 5.333 0 00-3.555 3.556c-.23.757-.23 1.687-.23 3.548M22.75 10a6 6 0 11-12 0 6 6 0 0112 0z"
        stroke={props.color ?? '#717680'}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ProfileIcon;
