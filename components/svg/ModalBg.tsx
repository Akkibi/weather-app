import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ModalBg = () => (
  <Svg
    width={340}
    height={439}
    viewBox="0 0 310 439"
    fill="#000"
    style={{position: 'absolute'}}
  >
    <Path
      d="M241.453 0H0V404.549L68.6484 439H309.319V34.5L241.453 0Z"
      fill="#0F0E13"
      fillOpacity="0.5"
    />
    <Path
      d="M0.5 404.24V0.5H241.333L308.819 34.8067V438.5H68.7668L0.5 404.24Z"
      stroke="white"
    />
  </Svg>
);

export default ModalBg;
