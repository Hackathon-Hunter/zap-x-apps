import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function WalletIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M12 6V3.376c0-.624 0-.936-.131-1.128a.75.75 0 00-.493-.315c-.23-.039-.512.092-1.079.353l-6.653 3.07c-.505.234-.757.35-.942.531a1.5 1.5 0 00-.365.57c-.087.244-.087.522-.087 1.079v3.714m10.125-.375h.008M2.25 8.4v4.95c0 .84 0 1.26.163 1.581a1.5 1.5 0 00.656.656c.32.163.74.163 1.581.163h8.7c.84 0 1.26 0 1.581-.163a1.5 1.5 0 00.655-.656c.164-.32.164-.74.164-1.58V8.4c0-.84 0-1.26-.164-1.582a1.5 1.5 0 00-.655-.655C14.611 6 14.191 6 13.35 6h-8.7c-.84 0-1.26 0-1.581.164a1.5 1.5 0 00-.656.655C2.25 7.14 2.25 7.56 2.25 8.4zm10.5 2.475a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        stroke={props.color && '#fff'}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default WalletIcon;
