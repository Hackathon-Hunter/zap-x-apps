import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function CalendarIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M15.75 7.5H2.25m9.75-6v3m-6-3v3m-.15 12h6.3c1.26 0 1.89 0 2.371-.245.424-.216.768-.56.984-.983.245-.482.245-1.112.245-2.372V6.6c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 00-.984-.984C14.041 3 13.412 3 12.15 3h-6.3c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 00-.984.984c-.245.48-.245 1.11-.245 2.371v6.3c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.48.245 1.11.245 2.371.245z"
        stroke={props.color && '#fff'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CalendarIcon;
