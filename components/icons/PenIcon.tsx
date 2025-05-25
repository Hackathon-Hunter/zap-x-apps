import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PenIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M2.15703 13.587C2.19149 13.2768 2.20872 13.1218 2.25564 12.9768C2.29726 12.8483 2.35607 12.7259 2.43048 12.6131C2.51434 12.4859 2.62466 12.3756 2.8453 12.1549L12.75 2.25023C13.5784 1.4218 14.9216 1.4218 15.75 2.25023C16.5784 3.07865 16.5784 4.4218 15.75 5.25023L5.84529 15.1549C5.62466 15.3756 5.51434 15.4859 5.38717 15.5698C5.27434 15.6442 5.15197 15.703 5.02338 15.7446C4.87845 15.7915 4.72339 15.8087 4.41328 15.8432L1.875 16.1252L2.15703 13.587Z"
        stroke={props.color || 'white'}  
        strokeWidth={1.25}               
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default PenIcon;
