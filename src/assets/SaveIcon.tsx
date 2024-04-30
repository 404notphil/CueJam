import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

const SaveIcon = ({
  size = 132,
  strokeColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 132 132" // Set viewBox to original width and height
    fill="none"
    style={style}
    {...props}>
    <Path
      stroke={strokeColor} // Use strokeColor prop
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={13.111}
      d="M98.778 125V72.555H33.222V125m0-118v32.778h52.445M111.889 125H20.111A13.11 13.11 0 01 7 111.889V20.111A13.11 13.11 0 0120.111 7h72.111L125 39.778v72.111A13.111 13.111 0 01111.889 125Z"
    />
  </Svg>
);

export default SaveIcon;
