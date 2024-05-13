/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigation from '@navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox, StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Toast} from '@components/Toast';

LogBox.ignoreAllLogs();

const MainLayout = () => {

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        <AppNavigation />
        <Toast insetsTop={10} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
