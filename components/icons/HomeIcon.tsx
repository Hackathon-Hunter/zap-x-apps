import Svg, { Path, SvgProps } from 'react-native-svg';

function HomeIcon(props: SvgProps) {
  return (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
      <Path
        d="M10.917 22.667h10.666M14.94 3.685L5.897 10.72c-.604.47-.907.705-1.124 1-.193.26-.337.554-.424.866-.099.353-.099.736-.099 1.502v9.646c0 1.494 0 2.24.29 2.811.256.502.664.91 1.166 1.165.57.291 1.317.291 2.81.291h15.467c1.494 0 2.24 0 2.811-.29.502-.256.91-.664 1.165-1.166.291-.57.291-1.317.291-2.81v-9.647c0-.766 0-1.149-.099-1.502a2.665 2.665 0 00-.424-.867c-.217-.294-.52-.529-1.124-1L17.56 3.686c-.469-.364-.703-.546-.961-.616a1.334 1.334 0 00-.697 0c-.26.07-.493.252-.962.616z"
        stroke={props.color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
