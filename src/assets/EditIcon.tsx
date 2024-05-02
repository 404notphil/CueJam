import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

const EditIcon = ({
  size = 50,
  strokeColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox={'0 0 30 30'} // Set viewBox to original width and height
    fill="none"
    style={style}
    {...props}>
    <Path
      stroke={strokeColor} // Use strokeColor prop
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.156 2.086a3.42 3.42 0 0 1 1.11-.804 3.196 3.196 0 0 1 2.62 0c.416.187.793.46 1.111.804.318.345.57.754.742 1.203a3.977 3.977 0 0 1 0 2.84c-.172.449-.424.858-.742 1.202L7.657 25.033 1 27l1.816-7.212 16.34-17.702Z"
    />
  </Svg>
);

export default EditIcon;
