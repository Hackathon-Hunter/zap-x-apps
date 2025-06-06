import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function ShareIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M15.75 6.75L15.75 2.25M15.75 2.25H11.25M15.75 2.25L9.75 8.25M7.5 3.75H5.85C4.58988 3.75 3.95982 3.75 3.47852 3.99524C3.05516 4.21095 2.71095 4.55516 2.49524 4.97852C2.25 5.45982 2.25 6.08988 2.25 7.35V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75H10.65C11.9101 15.75 12.5402 15.75 13.0215 15.5048C13.4448 15.289 13.789 14.9448 14.0048 14.5215C14.25 14.0402 14.25 13.4101 14.25 12.15V10.5"
        stroke={props.color ?? 'white'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ShareIcon;
