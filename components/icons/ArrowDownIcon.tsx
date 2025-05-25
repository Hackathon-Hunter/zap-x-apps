import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowDownIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M4.5 6.75l4.5 4.5 4.5-4.5"
        stroke={props.color ?? '#717680'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowDownIcon;
