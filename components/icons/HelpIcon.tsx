import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function HelpIcon(props: SvgProps) {
  return (
    <Svg width={18} height={19} viewBox="0 0 18 19" fill="none" {...props}>
      <Path
        d="M6.57435 6.99984C6.77027 6.44289 7.15698 5.97326 7.66598 5.67411C8.17498 5.37497 8.77343 5.26562 9.35533 5.36543C9.93723 5.46524 10.465 5.76777 10.8452 6.21944C11.2255 6.67111 11.4336 7.24277 11.4327 7.83317C11.4327 9.49984 8.93268 10.3332 8.93268 10.3332M8.99935 13.6665H9.00768M17.3327 9.49984C17.3327 14.1022 13.6017 17.8332 8.99935 17.8332C4.39698 17.8332 0.666016 14.1022 0.666016 9.49984C0.666016 4.89746 4.39698 1.1665 8.99935 1.1665C13.6017 1.1665 17.3327 4.89746 17.3327 9.49984Z"
        stroke={props.color || 'white'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HelpIcon;
