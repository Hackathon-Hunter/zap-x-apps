import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function WithdawIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 19}
      height={props.height ?? 18}
      viewBox="0 0 19 18"
      fill="none"
      {...props}
    >
      <Path
        d="M12.5 13.5L14.75 15.75M14.75 15.75L17 13.5M14.75 15.75V11.25M17 7.5H2M17 9V6.15C17 5.30992 17 4.88988 16.8365 4.56902C16.6927 4.28677 16.4632 4.0573 16.181 3.91349C15.8601 3.75 15.4401 3.75 14.6 3.75H4.4C3.55992 3.75 3.13988 3.75 2.81901 3.91349C2.53677 4.0573 2.3073 4.28677 2.16349 4.56901C2 4.88988 2 5.30992 2 6.15V11.85C2 12.6901 2 13.1101 2.16349 13.431C2.3073 13.7132 2.53677 13.9427 2.81901 14.0865C3.13988 14.25 3.55992 14.25 4.4 14.25H9.5"
        stroke={props.color ?? 'white'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default WithdawIcon;
