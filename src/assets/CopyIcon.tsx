import * as React from 'react';
import {View} from 'react-native';
import {SvgProps, Path} from 'react-native-svg';
import SaveIcon from './SaveIcon';

interface CustomSvgProps extends SvgProps {
  size?: number; // Optional size prop for uniform scaling
  strokeColor?: string; // Optional prop for stroke color
}

const CopyIcon = ({
  size = 132,
  strokeColor = '#CF0',
  style,
  ...props
}: CustomSvgProps) => (
  <View style={{justifyContent: 'center', position: 'relative'}}>
    <SaveIcon
      size={size}
      strokeColor={strokeColor}
      style={[style, {position: 'relative'}]}
      {...props}
    />
    <SaveIcon
      size={size}
      strokeColor={strokeColor}
      style={[
        style,
        {
          position: 'absolute',
          transform: [{translateX: 5}, {translateY: 5}],
          opacity: 0.5,
        },
      ]}
      {...props}
    />
  </View>
);

export default CopyIcon;
