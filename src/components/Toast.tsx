import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
  Text,
  TextProps,
} from 'react-native';
import {colors, metrics} from '@themes';
import Emitter from '@utilities/Emitter';
import {getStatusBarHeight} from '@utilities/utils';
import {Row} from './Row';
import {DEFAULT_SHOW_TOAST, LocaleMessage} from '@constants';

const HEIGHT = getStatusBarHeight() + metrics.marginVertical;

type IToastProps = {
  insetsTop?: number;
};

interface IToastState {
  message: string;
  type: number;
}

interface IStyleSheet {
  container: StyleProp<ViewStyle>;
  messageContainer: () => ViewProps;
  textStyle: TextProps;
}

enum EToastType {
  SUCCESS = 1,
  ERROR = 0,
  INFO = 2,
}

export class Toast extends React.PureComponent<IToastProps, IToastState> {
  frameID(frameID: any) {
    throw new Error('Method not implemented.');
  }
  offset: Animated.Value;
  opacity: Animated.Value;
  animated: Animated.AnimatedProps<any> | null;
  // Static methods
  static success(text: string) {
    Emitter.emit('SHOW_TOAST_MESSAGE', {
      message: text,
      type: EToastType.SUCCESS,
    });
  }

  static error(text: string) {
    Emitter.emit('SHOW_TOAST_ERROR', {message: text, type: 'error'});
  }

  static info(text: string) {
    Emitter.emit('SHOW_TOAST_INFO', {message: text, type: 'info'});
  }

  constructor(props: IToastProps, IState: IToastState, offset: any) {
    super(props);
    this.state = {
      message: '',
      type: EToastType.SUCCESS,
    };
    this.offset = new Animated.Value(-HEIGHT);
    this.opacity = new Animated.Value(0);
    this.animated = null;
  }

  componentDidMount() {
    Emitter.on('SHOW_TOAST_MESSAGE', this.displayMessage);
    Emitter.on('SHOW_TOAST_ERROR', this.displayMessage);
    Emitter.on('SHOW_TOAST_INFO', this.displayMessage);
  }

  componentWillUnmount() {
    Emitter.rm('SHOW_TOAST_MESSAGE');
    Emitter.rm('SHOW_TOAST_ERROR');
    Emitter.rm('SHOW_TOAST_INFO');
  }

  displayMessage = ({message, type}: IToastState): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.cancelAnimationFrame(this.frameID);

    this.offset.setValue(HEIGHT * -1);
    this.setState({message, type});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.frameID = window.requestAnimationFrame(() => {
      this.animated = Animated.sequence([
        Animated.delay(100),
        // Fade In
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(DEFAULT_SHOW_TOAST),
        // Fade Out
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: HEIGHT * -1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]);
      this.animated.start();
    });
  };

  dismiss = () => {
    this.animated?.stop();
    Animated.parallel([
      Animated.parallel([
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.offset, {
          toValue: HEIGHT * -1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  messageColor = (): string => {
    const {type} = this.state;

    if (type === EToastType.SUCCESS) {
      return colors.success;
    }
    if (type === EToastType.INFO) {
      return colors.notification;
    }
    return colors.error;
  };

  render() {
    const {message} = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: this.offset}],
            opacity: this.opacity,
            top: (this.props.insetsTop ?? 0) + metrics.xxs,
          },
        ]}>
        <Row
          isPressAble
          activeOpacity={1}
          style={styles.messageContainer(this.messageColor())}
          onPress={() => {
            this.dismiss();
          }}>
          <Text style={styles.textStyle}>{message}</Text>
        </Row>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create<IStyleSheet | any>({
  container: {
    minHeight: HEIGHT,
    zIndex: 9999,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  messageContainer: (color: string): ViewStyle => ({
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: metrics.small,
    paddingVertical: metrics.xs,
    paddingHorizontal: metrics.small,
    borderRadius: metrics.borderRadiusLarge,
    backgroundColor: color,
  }),
  textStyle: {
    width: metrics.textWidthToast,
  },
});
