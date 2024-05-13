import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg';
import {colors, metrics} from '@themes';

export const StarIcon = ({
  size = metrics.xxl,
  percent = 0,
}: {
  size?: number;
  percent?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      fill="url(#grad)"
      d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118   l11.547-1.2L16.026,0.6L20.388,10.918z"
    />
    <Defs>
      <LinearGradient id="grad">
        <Stop offset={`${percent}%`} stopColor={colors.orange} />
        <Stop offset={`${percent}%`} stopColor={colors.sky} />
      </LinearGradient>
    </Defs>
  </Svg>
);
