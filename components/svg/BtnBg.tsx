import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BtnBg = () => (
  <Svg
    width={116}
    height={38}
    viewBox="0 0 116 38"
    fill="none"
    style={{position: 'absolute'}}
  >
    <Path
      d="M1 1V0.5H0.5V1H1ZM1 28.2571H0.5V28.4514L0.631123 28.5947L1 28.2571ZM8.63112 37.3375C8.81754 37.5413 9.13381 37.5553 9.33753 37.3689C9.54126 37.1825 9.55529 36.8662 9.36888 36.6625L8.63112 37.3375ZM9 0.5H1V1.5H9V0.5ZM0.5 1V28.2571H1.5V1H0.5ZM0.631123 28.5947L8.63112 37.3375L9.36888 36.6625L1.36888 27.9196L0.631123 28.5947Z"
      fill="white"
    />
    <Path
      d="M9 1.5H107V0.5H9V1.5ZM107 36.5H9V37.5H107V36.5Z"
      fill="white"
    />
    <Path
      d="M107 37L115 37L115 9.74286L107 0.999997"
      stroke="white"
      strokeLinecap="round"
    />
  </Svg>
);

export default BtnBg;
