import React from 'react';
import { Svg, Path } from 'react-native-svg';

import { themes, colors } from 'constants/styleGuide';
import { useTheme } from 'contexts/ThemeContext';

export default ({ width = 8, height = 14, style }) => {
  const { theme } = useTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 8 14" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66078 4.72802C6.89718 4.99818 7.30782 5.02556 7.57799 4.78916C7.84815 4.55277 7.87553 4.14212 7.63913 3.87196L4.48913 0.27196C4.36571 0.1309 4.1874 0.0499878 3.99996 0.0499878C3.81252 0.0499878 3.63421 0.1309 3.51078 0.27196L0.360785 3.87196C0.124392 4.14212 0.151768 4.55277 0.421932 4.78916C0.692096 5.02556 1.10274 4.99818 1.33913 4.72802L3.99996 1.68707L6.66078 4.72802ZM6.66078 9.27196C6.89718 9.0018 7.30782 8.97442 7.57799 9.21081C7.84815 9.44721 7.87553 9.85785 7.63913 10.128L4.48913 13.728C4.36571 13.8691 4.1874 13.95 3.99996 13.95C3.81252 13.95 3.63421 13.8691 3.51078 13.728L0.360785 10.128C0.124392 9.85785 0.151768 9.44721 0.421932 9.21081C0.692096 8.97442 1.10274 9.0018 1.33913 9.27196L3.99996 12.3129L6.66078 9.27196Z"
        fill={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
      />
    </Svg>
  );
};
