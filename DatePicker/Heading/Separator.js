import React from 'react';
import Svg,{ Line } from 'react-native-svg';

const Separator = ({ color, size }) => (
  <Svg width={size} height={size}>
    <Line
      x1="0"
      y1={size}
      x2={size}
      y2="0"
      stroke={color}
      strokeWidth="1"
    />
  </Svg>
);

export default Separator;
