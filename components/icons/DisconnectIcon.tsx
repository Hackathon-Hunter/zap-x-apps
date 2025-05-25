import React from 'react';

import Svg, { Path, SvgProps, G, Defs, ClipPath, Rect } from 'react-native-svg';

function DisconnectIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <G clipPath="url(#clip0_10100_6475)">
        <Path
          d="M6.375 11.625L11.625 6.37498M6.75 3V1.5M11.25 15V16.5M3 6.75H1.5M15 11.25H16.5M3.68566 3.68566L2.625 2.625M14.3144 14.3143L15.375 15.3749M9.00003 13.2426L7.40904 14.8336C6.23746 16.0051 4.33797 16.0051 3.16639 14.8336C1.99482 13.662 1.99482 11.7625 3.16639 10.5909L4.75739 8.99993M13.2427 8.99993L14.8337 7.40894C16.0052 6.23737 16.0052 4.33788 14.8337 3.1663C13.6621 1.99473 11.7626 1.99473 10.591 3.1663L9.00003 4.75729"
          stroke={props.color || 'white'}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10100_6475">
          <Rect width="18" height="18" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DisconnectIcon;
