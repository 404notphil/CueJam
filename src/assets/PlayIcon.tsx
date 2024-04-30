import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop to uniformly scale width and height
  fillColor?: string; // Optional prop to change the fill color
}

const PlayIcon = ({
  size = 30,
  fillColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size} // Set both width and height to `size` for uniform scaling
    height={size}
    viewBox="0 0 138 145" // Original width and height as viewBox dimensions
    fill="none"
    style={style} // Spread style prop for external styling
    {...props}>
    <Path
      fill={fillColor} // Use fillColor prop
      fillRule="evenodd"
      d="M130.297 83.928c9.128-4.885 9.128-17.971 0-22.856L19.077 1.552C10.444-3.07 0 3.187 0 12.98v119.04c0 9.793 10.443 16.049 19.078 11.428l111.219-59.52Zm-9.906-9.054c2.241-1.16 2.241-4.365 0-5.525L17.502 16.09c-2.07-1.072-4.54.43-4.54 2.762V125.37c0 2.332 2.47 3.834 4.54 2.763l102.889-53.258Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default PlayIcon;
