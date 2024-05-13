/* eslint-disable react/prop-types */
import React from 'react';
import {colors, metrics} from '@themes';
import {CustomImage} from '@components';
import {StyleSheet} from 'react-native';

export const ConfigBottomTabIcon: {
  [key: string]: ({color}: {color: string}) => void;
} = {
  Home: ({color = colors.black}) => (
    <CustomImage
      name={'ic_home'}
      style={[styles.container, {tintColor: color}]}
    />
  ),
  Search: ({color = colors.black}) => (
    <CustomImage
      name={'ic_search'}
      style={[styles.container, {tintColor: color}]}
    />
  ),
  Add: ({color = colors.black}) => (
    <CustomImage
      name={'ic_add'}
      style={[styles.container, {tintColor: color}]}
    />
  ),
  Reel: ({color = colors.black}) => (
    <CustomImage
      name={'ic_reel'}
      style={[styles.container, {tintColor: color}]}
    />
  ),
  Profile: ({color = colors.black}) => (
    <CustomImage
      name={'ic_profile'}
      style={[styles.container, {tintColor: color}]}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    width: metrics.icon,
    height: metrics.icon,
  },
});
