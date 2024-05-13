// TODO: Waiting for StyleGuide from design
import {FontSizes, deviceWidth, metrics, pw} from './metrics';

export const ANGLE_CENTER = {x: 0.5, y: 0.5};
export const DEFAULT_ANGLE = 135;
export const DEFAULT_DISABLED_OPACITY = 0.6;
export const DEFAULT_POSITION_TEXT =
  (metrics.buttonHeight + FontSizes.small / 2) / 2;
export const START_GRADIENT_TEXT = {x: 0, y: 0};
export const END_GRADIENT_TEXT = {x: 1.9, y: 1.1};
export const OPACITY_VALUE_GRADIENT_TEXT = 0;
export const MAXIMUM_PERCENT = 100;
export const ACTIVE_OPACITY = 0.6;
export const ASPECT_RATIO = 1;
export const BORDER_WIDTH_05 = 0.5;
export const BORDER_WIDTH_07 = 0.7;
export const BORDER_WIDTH = 1;
export const END_REACHED_THRESHOLD = 16;
export const Z_INDEX = 1;
export const ELEVATION = 1;
export const NUMBER_OF_LINES = {
  ONE_LINE: 1,
  TWO_LINE: 2,
  THREE_LINE: 3,
};
export const REFERRAL_CARD = {
  RATING_DEFAULT: 0,
  NUMBER_OF_COMMENT: 0,
};
export const SHORT_CARD = {
  NUMBER_OF_FAVORITE: 0,
  NUMBER_OF_COMMENT: 0,
  RATING_DEFAULT: 0,
  INTERACT_BUTTON_WIDTH: '40%',
};
export const EDGES = ['top', 'left', 'right'];
export const POST_CARD = {
  TOTAL_RATING_VALUE: 0,
  NUMBER_OF_COMMENT_VALUE: 0,
  REFERRAL_COMMENT_VALUE: 0,
  REFERRAL_RATING_VALUE: 0,
  MAX_WIDTH_USER_NAME: '60%',
  Z_INDEX_NUMBER_PHOTO: 1,
  ELEVATION_NUMBER_PHOTO: 1,
  MAX_WIDTH_TAG_CARD: '30%',
  MINIMUM_NUMBER_OF_PHOTO: 1,
  TEXT_LIST_LIKE: 'いいね!',
  MINIMUM_NUMBER_OF_COMMENT: 1,
};
export const VIDEO_CARD = {
  MINIMUM_DURATION: 0,
  MINIMUM_CURRENT_TIME: 0,
  WIDTH_VIDEO: '100%',
  HEIGHT_VIDEO: deviceWidth(),
  WIDTH_LOAD_VIDEO: '100%',
  HEIGHT_LOAD_VIDEO: '100%',
  Z_INDEX: 1,
  ELEVATION: 1,
  MINIMUM_VALUE_SLIDER: 0,
  STEP_SLIDER: 1,
  WIDTH_SLIDER: deviceWidth() + pw(28),
  ROTATE_FORBIDDEN: '120deg',
  HEIGHT_ALLOW_VIDEO_TO_BE_ENABLED: 0.7,
};
export const MODAL_OPTION_LIST = {
  MINIMUM_DATA_LENGTH: 1,
  WIDTH_OVER_VIEW: '100%',
  HEIGHT_OVER_VIEW: '100%',
  OPACITY_OVER_VIEW: 0.7,
  TEXT_CANCEL: 'キャンセル',
};
export const BADGE = {
  SIZE_ICON_DEFAULT: pw(32),
  DISPLAY_DISTANCE: (size: number) => pw(size / 4),
};
export const GROUP_AVATAR = {
  MINIMUM_AVATAR: 0,
  MAXIMUM_AVATAR: 4,
  NUMBER_OF_AVATAR_DISPLAY: 3,
  HEIGHT_GROUP: (size: number) => pw(size * 1.2),
  WIDTH_HEIGHT: (size: number) => pw(size * 0.75 + 24),
  LEFT_AVATAR: (position: number) => pw(position * 0.75),
  LEFT_TEXT: (position: number) => pw(position * 1),
};
export const ITEM_LIST = {
  WIDTH_ICON: '20%',
};
