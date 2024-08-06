import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

/* SVGR has dropped some elements not supported by react-native-svg: filter */
const StatsIcon = ({
  size = 160,
  strokeColor = '#CF0',
  ...props
}: CustomSvgProps) => (
  <Svg
    width={size}
    height={size}
    viewBox={'0 0 141 70'} // Set viewBox to original width and height
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <Path
        fill="#CF0"
        fillRule="evenodd"
        d="M128.331 1.981a1.512 1.512 0 0 0-2.464-.437l-.004-.003-.013.02a1.527 1.527 0 0 0-.299.466l-15.396 23.977a6.88 6.88 0 1 0-.545 6.395l.023.014 17.091-26.617 6.483 14.5a1.512 1.512 0 1 0 2.76-1.234l-7.636-17.08Zm-23.184 30.322a3.856 3.856 0 1 0-2.657-7.24 3.856 3.856 0 0 0 2.657 7.24ZM81.285 17.39c.763-.34 1.657 0 1.998.763l7.636 17.08a1.512 1.512 0 0 1-2.76 1.235l-6.483-14.5-17.09 26.617-.025-.015a6.88 6.88 0 1 1 .546-6.395l15.396-23.976c.07-.17.17-.33.299-.466l.013-.02.004.003a1.51 1.51 0 0 1 .466-.326ZM62.39 43.526a3.856 3.856 0 1 1-7.239 2.656 3.856 3.856 0 0 1 7.24-2.656Zm-25.702-9.03c.762-.34 1.656.001 1.997.764l7.637 17.08a1.512 1.512 0 0 1-2.761 1.234l-6.483-14.5-17.091 26.618-.024-.015a6.88 6.88 0 1 1 .546-6.395l15.397-23.98c.07-.168.17-.325.296-.46l.015-.023.004.003c.13-.133.287-.245.467-.325ZM17.792 60.635a3.856 3.856 0 1 1-7.24 2.656 3.856 3.856 0 0 1 7.24-2.656Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default StatsIcon;
