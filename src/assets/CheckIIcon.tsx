import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop to uniformly scale width and height
  strokeColor?: string; // Optional prop to change the fill color
}

const CheckIcon = ({
  size = 30,
  strokeColor = 'white',
  ...props
}: CustomSvgProps) => (
  <Svg
    viewBox="0 0 13 7.7" // Original width and height as viewBox dimensions
    width={size}
    height={size}
    fill="none"
    {...props}>
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M12.4 1 4.5 8.7 1 5.2"
    />
  </Svg>
);
export default CheckIcon;
