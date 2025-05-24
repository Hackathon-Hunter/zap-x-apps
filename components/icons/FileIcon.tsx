import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

function FileIcon(props: SvgProps) {
  return (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
      <Path
        d="M18.916 3.026v5.507c0 .747 0 1.12.146 1.406.127.25.331.454.582.582.286.146.659.146 1.406.146h5.507m-7.64 12h-8m10.666-5.334H10.916m16-4.015v9.615c0 2.24 0 3.36-.436 4.216a4 4 0 01-1.748 1.748c-.855.436-1.975.436-4.216.436h-8.533c-2.24 0-3.36 0-4.216-.436A4 4 0 016.02 27.15c-.436-.855-.436-1.976-.436-4.216V9.066c0-2.24 0-3.36.436-4.215a4 4 0 011.748-1.749c.856-.435 1.976-.435 4.216-.435h4.282c.979 0 1.468 0 1.928.11a4 4 0 011.156.479c.404.247.75.593 1.442 1.285l4.25 4.251c.693.692 1.038 1.038 1.286 1.441a4 4 0 01.479 1.157c.11.46.11.95.11 1.928z"
        stroke={props.color ?? '#717680'}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FileIcon;
