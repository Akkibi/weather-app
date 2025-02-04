import React from 'react';
import Svg, { Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend, G } from 'react-native-svg';

const SmallModalBg = () => {
  return (
    <Svg
      width={307}
      height={254}
      viewBox="0 0 307 254"
      fill="#000"
      style={{position: 'absolute'}}
    >
      <Path
        d="M285.071 0H0V243.053L15.6102 254H307V15.3813L285.071 0Z"
        fill="#0F0E13"
      />
      <Path
        d="M0.5 242.793V0.5H284.914L306.5 15.6414V253.5H15.768L0.5 242.793Z"
        stroke="white"
      />
    </Svg>
  );
};

export default SmallModalBg;
