import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

const CloseIcon = ({
  size = 132,
  strokeColor = '#CF0',
  ...props
}: CustomSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 90 90" fill="none" {...props}>
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeWidth={15}
      d="M8.141 78.842 80 9.298M9.298 8.141l69.544 71.858"
    />
  </Svg>
);
export default CloseIcon;
