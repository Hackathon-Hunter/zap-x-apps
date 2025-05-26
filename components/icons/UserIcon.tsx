import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function UserIcon(props: SvgProps) {
  return (
    <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <Path
        d="M17.1668 17.5C17.1668 16.337 17.1668 15.7555 17.0233 15.2824C16.7001 14.217 15.8664 13.3834 14.8011 13.0602C14.328 12.9167 13.7465 12.9167 12.5835 12.9167H8.41683C7.25386 12.9167 6.67237 12.9167 6.19921 13.0602C5.13388 13.3834 4.3002 14.217 3.97703 15.2824C3.8335 15.7555 3.8335 16.337 3.8335 17.5M14.2502 6.25C14.2502 8.32107 12.5712 10 10.5002 10C8.42909 10 6.75016 8.32107 6.75016 6.25C6.75016 4.17893 8.42909 2.5 10.5002 2.5C12.5712 2.5 14.2502 4.17893 14.2502 6.25Z"
        stroke={props.color ?? 'white'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UserIcon;
