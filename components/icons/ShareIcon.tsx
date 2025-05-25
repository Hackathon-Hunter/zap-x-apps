import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ShareIcon(props: SvgProps) {
    return (
        <Svg width={15} height={16} viewBox="0 0 15 16" fill="none" {...props}>
            <Path
                d="M14.25 5.75L14.25 1.25M14.25 1.25H9.75M14.25 1.25L8.25 7.25M6 2.75H4.35C3.08988 2.75 2.45982 2.75 1.97852 2.99524C1.55516 3.21095 1.21095 3.55516 0.995235 3.97852C0.75 4.45982 0.75 5.08988 0.75 6.35V11.15C0.75 12.4101 0.75 13.0402 0.995235 13.5215C1.21095 13.9448 1.55516 14.289 1.97852 14.5048C2.45982 14.75 3.08988 14.75 4.35 14.75H9.15C10.4101 14.75 11.0402 14.75 11.5215 14.5048C11.9448 14.289 12.289 13.9448 12.5048 13.5215C12.75 13.0402 12.75 12.4101 12.75 11.15V9.5"
                stroke="white"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default ShareIcon;
