import React from 'react';
import Svg, {Line} from 'react-native-svg';

const Pentagram = ({width = 300, height = 80, lineSpacing = 10}) => {
  const lines = Array.from({length: 5}, (_, index) => (
    <Line
      key={index}
      x1="0"
      y1={index * lineSpacing + 10} // Starting a bit lower to have padding
      x2={width}
      y2={index * lineSpacing + 10}
      stroke="#FFF"
      strokeWidth="1"
    />
  ));

  return (
    <Svg height={height} width={width}>
      {lines}
    </Svg>
  );
};

export default Pentagram;
