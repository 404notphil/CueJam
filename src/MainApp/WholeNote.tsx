import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const WholeNote = (props: SvgProps) => (
  <Svg width={150} height={100} fill="none" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M55 70c30.376 0 55-15.67 55-35S85.376 0 55 0C24.625 0 0 15.67 0 35s24.625 35 55 35ZM38.842 47.195C49.787 61.767 65.915 68.13 74.866 61.409c8.95-6.723 7.333-23.986-3.612-38.559C60.309 8.277 44.18 1.914 35.229 8.636c-8.95 6.723-7.333 23.986 3.613 38.559Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WholeNote;
