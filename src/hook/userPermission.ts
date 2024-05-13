import React from 'react';
import {Alert} from 'react-native';
import {
  Permission,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

export function usePermisstion(permisstion: Permission) {
  const [isHasPermisstion, setIsHasPermisstion] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    checkPermisstion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkPermisstion() {
    const result = await check(permisstion);
    if (result !== RESULTS.GRANTED) {
      setIsHasPermisstion(false);
      const _result = await request(permisstion);
      if (_result === RESULTS.BLOCKED) {
        Alert.alert(' 通知', '写真へアクセスを許可してください', [
          {
            text: 'ライブラリへのアクセスを許可',
            onPress: () => openSettings(),
          },
          {
            text: 'キャンセル',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      }
    }
    if (result === RESULTS.GRANTED) {
      setIsHasPermisstion(true);
    }
  }

  const refTimeout = React.useRef<NodeJS.Timeout>();

  async function checkPermisstionOnly() {
    const result = await check(permisstion);
    if (result === RESULTS.GRANTED) {
      setIsHasPermisstion(true);
    }
  }

  function reload() {
    if (refTimeout.current && isHasPermisstion) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setInterval(() => {
      checkPermisstionOnly();
    }, 1000);
  }

  React.useEffect(() => {
    !isHasPermisstion && reload();
    if (isHasPermisstion && refTimeout.current) {
      clearInterval(refTimeout.current);
    }
    () => {
      clearInterval(refTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHasPermisstion]);

  function onSetting() {
    openSettings();
  }

  return {isHasPermisstion, onSetting, checkPermisstion, checkPermisstionOnly};
}
