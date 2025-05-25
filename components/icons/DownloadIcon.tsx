import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function DownloadFileIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M10.5 1.70215V4.80005C10.5 5.22009 10.5 5.43011 10.5817 5.59055C10.6537 5.73167 10.7684 5.8464 10.9095 5.91831C11.0699 6.00005 11.28 6.00005 11.7 6.00005H14.7979M6.75 11.25L9 13.5M9 13.5L11.25 11.25M9 13.5L9 9M10.5 1.5H6.6C5.33988 1.5 4.70982 1.5 4.22852 1.74524C3.80516 1.96095 3.46095 2.30516 3.24524 2.72852C3 3.20982 3 3.83988 3 5.1V12.9C3 14.1601 3 14.7902 3.24524 15.2715C3.46095 15.6948 3.80516 16.039 4.22852 16.2548C4.70982 16.5 5.33988 16.5 6.6 16.5H11.4C12.6601 16.5 13.2902 16.5 13.7715 16.2548C14.1948 16.039 14.539 15.6948 14.7548 15.2715C15 14.7902 15 14.1601 15 12.9V6L10.5 1.5Z"
        stroke={props.color ?? 'white'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DownloadFileIcon;
