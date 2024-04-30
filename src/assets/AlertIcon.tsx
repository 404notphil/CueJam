import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Uniform size prop for both width and height
  strokeColor?: string; // Optional prop to change the stroke color
}

const AlertIcon = ({
  size = 22, // Default size if not specified
  strokeColor = "#00D1FF", // Default stroke color if not specified
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 22 22" // The original width and height as viewBox dimensions
    fill="none"
    style={style}
    {...props}
  >
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 7v4m0 4h.01M21 11c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10Z"
    />
  </Svg>
);

export default AlertIcon;
