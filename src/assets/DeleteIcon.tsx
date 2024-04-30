import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string; // Optional prop to change the stroke color
}

const DeleteIcon = ({
  width = 20,
  height = 22,
  strokeColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 22" // The original width and height as viewBox dimensions
    fill="none"
    style={style}
    {...props}>
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 5h2m0 0h16M3 5v14a2 2 0 002 2h10a2 2 0 002-2V5M6 5V3a2 2 0 012-2h4a2 2 0 012 2v2m-6 5v6m4-6v6"
    />
  </Svg>
);

export default DeleteIcon;
