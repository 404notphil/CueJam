import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SavedDrillsIcon = ({
  size = 150,
  strokeColor = '#CF0',
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox={'0 0 120 65'} // Set viewBox to original width and height
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <Path
        fill="#CF0"
        fillRule="evenodd"
        d="M39.684 17.733 20.03 4.879v36.556c0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.35 0-4.613 3.728-8.352 8.328-8.352 1.874 0 3.604.621 4.996 1.67V1.823A1.667 1.667 0 0 1 19.296.41l22.962 15.017c.503.33.77.885.755 1.447l.056 39.175c.037.32.056.645.056.974 0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.351 0-4.612 3.728-8.351 8.328-8.351 1.846 0 3.551.602 4.932 1.622l-.046-32.562Zm.054 38.54v.084h.012a5.004 5.004 0 0 1-4.953 5.678 5.004 5.004 0 0 1-4.996-5.011 5.004 5.004 0 0 1 4.997-5.01 5.002 5.002 0 0 1 4.94 4.26Zm-28.035-9.827a5.004 5.004 0 0 0 4.996-5.01 5.004 5.004 0 0 0-4.997-5.011 5.004 5.004 0 0 0-4.996 5.01 5.004 5.004 0 0 0 4.997 5.01Z"
        clipRule="evenodd"
      />
    </G>
    <G filter="url(#b)">
      <Path
        fill="#CF0"
        fillRule="evenodd"
        d="M99.684 17.733 80.03 4.879v36.556c0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.35 0-4.613 3.728-8.352 8.328-8.352 1.874 0 3.604.621 4.996 1.67V1.823A1.667 1.667 0 0 1 79.296.41l22.962 15.017c.504.33.771.885.755 1.447l.056 39.175c.037.32.056.645.056.974 0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.351 0-4.612 3.728-8.351 8.328-8.351 1.846 0 3.551.602 4.932 1.622l-.046-32.562Zm.054 38.54v.084h.012a5.004 5.004 0 0 1-4.953 5.678 5.004 5.004 0 0 1-4.996-5.011 5.004 5.004 0 0 1 4.996-5.01 5.002 5.002 0 0 1 4.941 4.26Zm-28.035-9.827a5.004 5.004 0 0 0 4.996-5.01 5.004 5.004 0 0 0-4.996-5.011 5.004 5.004 0 0 0-4.997 5.01 5.004 5.004 0 0 0 4.996 5.01Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default SavedDrillsIcon;
