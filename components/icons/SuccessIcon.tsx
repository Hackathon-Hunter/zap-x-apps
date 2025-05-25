import * as React from 'react';

import Svg, { G, Rect, Path, Defs, SvgProps } from 'react-native-svg';

function SuccessIcon(props: SvgProps) {
  return (
    <Svg width={114} height={114} viewBox="0 0 114 114" fill="none" {...props}>
      <G filter="url(#filter0_d_10094_2736)">
        <Rect x={17} y={17} width={80} height={80} rx={40} fill="#074D31" />
        <Rect
          x={15.75}
          y={15.75}
          width={82.5}
          height={82.5}
          rx={41.25}
          stroke="#085D3A"
          strokeWidth={2.5}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M73.988 41.633L50.122 64.666 43.788 57.9c-1.166-1.1-3-1.167-4.333-.234-1.3.967-1.667 2.667-.867 4.034l7.5 12.2c.734 1.133 2 1.833 3.434 1.833 1.366 0 2.666-.7 3.4-1.833 1.2-1.567 24.1-28.867 24.1-28.867 3-3.067-.634-5.767-3.034-3.433v.033z"
          fill="#47CD89"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SuccessIcon;
