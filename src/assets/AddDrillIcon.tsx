import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

/* SVGR has dropped some elements not supported by react-native-svg: filter */
const AddDrillIcon = ({
  size = 120,
  strokeColor = '#CF0',
  ...props
}: CustomSvgProps) => {
  const renderSvg = (
    fillColor: string,
    translateX = 0,
    translateY = 0,
    opacity = 1,
  ) => (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 90 61"
      fill="none"
      {...props}
      style={{
        position: 'absolute',
        transform: [{translateX}, {translateY}],
        opacity,
      }}>
      <G>
        <Path
          fill={fillColor}
          fillRule="evenodd"
          d="M37.366 16.734 19.022 4.737v34.119c0 4.305-3.48 7.794-7.772 7.794-4.293 0-7.772-3.49-7.772-7.794 0-4.305 3.48-7.794 7.772-7.794 1.75 0 3.364.58 4.663 1.558V1.885A1.556 1.556 0 0 1 18.337.567L39.77 14.583c.47.307.719.826.704 1.35l.052 36.564c.035.298.053.601.053.909 0 4.304-3.48 7.794-7.773 7.794-4.292 0-7.772-3.49-7.772-7.794 0-4.305 3.48-7.795 7.772-7.795 1.723 0 3.315.563 4.604 1.514l-.043-30.391Zm.05 35.97v.08h.012a4.67 4.67 0 0 1-4.622 5.3 4.67 4.67 0 0 1-4.664-4.678 4.67 4.67 0 0 1 4.663-4.677 4.669 4.669 0 0 1 4.612 3.976ZM11.25 43.534a4.67 4.67 0 0 0 4.663-4.677 4.67 4.67 0 0 0-4.663-4.676 4.67 4.67 0 0 0-4.664 4.676 4.67 4.67 0 0 0 4.664 4.677Z"
          clipRule="evenodd"
        />
        <Path
          fill={fillColor}
          fillRule="evenodd"
          d="M68.42 47.2a1.557 1.557 0 1 0 3.115 0V36.157h11.043a1.557 1.557 0 1 0 0-3.115H71.535V21.3a1.558 1.558 0 0 0-3.115 0v11.742H56.678a1.557 1.557 0 1 0 0 3.115H68.42V47.2Z"
          clipRule="evenodd"
        />
      </G>
    </Svg>
  );

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      {renderSvg('rgba(0, 0, 0, 0.1)', 1, 1)}
      {renderSvg('rgba(0, 0, 0, 0.06)', 2.5, 2.5)}
      {renderSvg('rgba(0, 0, 0, 0.03)', 4, 4)}
      {renderSvg('rgba(0, 0, 0, 0.01)', 5, 5)}
      {renderSvg('rgba(0, 0, 0, 0.1)', 0, 0)}
      {renderSvg('#CF0')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

export default AddDrillIcon;
