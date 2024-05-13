import {deviceWidth, metrics, ph} from '@themes';

export const BANNER_HEIGHT = ph(300);
export const ITEM_BANNER_HEIGHT = ph(300);
export const RADIO_IMAGE_SCEREN = 0.9;
export const ITEM_BANNER_WIDTH = deviceWidth() * RADIO_IMAGE_SCEREN;
export const BANNER_POSITION = ph(20);
export const BANNER_CHANGE_TIME = 2500;
export const ITEM_BANNER_POSITION = ph(-40);
export const SCROLL_EVENT = 0.9;
export const SCROLL_OFFSET = 50;
export const BANNER_CONTAINER_HEIGHT =
  BANNER_HEIGHT + BANNER_POSITION + metrics.xxs;
