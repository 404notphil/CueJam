import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

const SavedDrillsIcon = ({
  size = 150,
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
      viewBox="0 0 120 65"
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
          d="M39.684 17.733 20.03 4.879v36.556c0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.35 0-4.613 3.728-8.352 8.328-8.352 1.874 0 3.604.621 4.996 1.67V1.823A1.667 1.667 0 0 1 19.296.41l22.962 15.017c.503.33.77.885.755 1.447l.056 39.175c.037.32.056.645.056.974 0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.351 0-4.612 3.728-8.351 8.328-8.351 1.846 0 3.551.602 4.932 1.622l-.046-32.562Zm.054 38.54v.084h.012a5.004 5.004 0 0 1-4.953 5.678 5.004 5.004 0 0 1-4.996-5.011 5.004 5.004 0 0 1 4.997-5.01 5.002 5.002 0 0 1 4.94 4.26Zm-28.035-9.827a5.004 5.004 0 0 0 4.996-5.01 5.004 5.004 0 0 0-4.997-5.011 5.004 5.004 0 0 0-4.996 5.01 5.004 5.004 0 0 0 4.997 5.01Z"
          clipRule="evenodd"
        />
        <Path
          fill={fillColor}
          fillRule="evenodd"
          d="M99.684 17.733 80.03 4.879v36.556c0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.35 0-4.613 3.728-8.352 8.328-8.352 1.874 0 3.604.621 4.996 1.67V1.823A1.667 1.667 0 0 1 79.296.41l22.962 15.017c.504.33.771.885.755 1.447l.056 39.175c.037.32.056.645.056.974 0 4.612-3.728 8.351-8.328 8.351-4.599 0-8.327-3.739-8.327-8.351 0-4.612 3.728-8.351 8.328-8.351 1.846 0 3.551.602 4.932 1.622l-.046-32.562Zm.054 38.54v.084h.012a5.004 5.004 0 0 1-4.953 5.678 5.004 5.004 0 0 1-4.996-5.011 5.004 5.004 0 0 1 4.996-5.01 5.002 5.002 0 0 1 4.941 4.26Zm-28.035-9.827a5.004 5.004 0 0 0 4.996-5.01 5.004 5.004 0 0 0-4.996-5.011 5.004 5.004 0 0 0-4.997 5.01 5.004 5.004 0 0 0 4.996 5.01Z"
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

export default SavedDrillsIcon;
