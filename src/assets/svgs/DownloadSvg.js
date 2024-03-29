import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default function DownloadSvg({ color = '#4070F4', height = 16, width = 16, style }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none" style={style}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.24996 9.07038L5.75547 7.65557C5.45467 7.3708 4.96697 7.3708 4.66616 7.65556C4.36535 7.94032 4.36535 8.40201 4.66615 8.68678L7.45527 11.3272C7.59972 11.4639 7.79564 11.5408 7.99992 11.5408C8.20421 11.5408 8.40013 11.464 8.54458 11.3272L11.3338 8.6868C11.6346 8.40204 11.6346 7.94035 11.3338 7.65559C11.033 7.37082 10.5453 7.37082 10.2445 7.65558L8.74996 9.07036V1.99917C8.74996 1.58496 8.41417 1.24917 7.99996 1.24917C7.58574 1.24917 7.24996 1.58496 7.24996 1.99917V9.07038Z"
        fill={color}
      />

      <Path d="M2.92188 13.6001H13.0844" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}
