import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Uniform size prop for both width and height
  strokeColor?: string; // Optional prop to change the stroke color
}

export const UpIcon = ({
  size = 24,
  strokeColor = '#FFFFFF',
  ...props
}: CustomSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 136 60" fill="none" {...props}>
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M128 68 68 8 8 68"
    />
  </Svg>
);

export const DownIcon = ({
  size = 24,
  strokeColor = '#FFFFFF',
  ...props
}: CustomSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 136 60" fill="none" {...props}>
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M128 8 68 68 8 8"
    />
  </Svg>
);
