import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  width?: number;
  height?: number;
  fillColor?: string; // Optional prop to change the stroke color
}

const DragIcon = ({
  height = 21,
  width = 9,
  fillColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 54 114"
    fill={fillColor}
    style={[style, {aspectRatio: width / height}]}
    {...props}>
    <Path
      fill={fillColor}
      d="M15 7.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM15 73.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM54 7.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM54 73.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM54 40.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM54 106.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM15 40.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM15 106.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
    />
  </Svg>
);

export default DragIcon;
