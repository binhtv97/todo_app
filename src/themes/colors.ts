const colors = {
  black: '#1F1F1F',
  backgroundItem: '#1F1F2D',
  ceruleanBlue: '#2b64c4',
  transparent: 'transparent',
  white: '#ffffff',
  whiteSmoke: '#f8f4f1',
  lightGray: '#f4f4f4',
  gray: '#454545',
  inkLighter: '#72777A',
  inkLight: '#6C7072',
  ink: '#404446',
  inkDark: '#303437',
  inkDarker: '#202325',
  inkDarkest: '#090A0A',
  isabelline: '#f5f2ef',
  skyLightest: '#F7F9FA',
  skyLighter: '#F2F4F5',
  skyLight: '#E3E5E5',
  sky: '#CDCFD0',
  skyDark: '#979C9E',
  primaryLightest: '#FFE1ED',
  primaryLighter: '#FFB4CF',
  primaryLight: '#FE81AF',
  primary: '#FE438D',
  primaryDarkest: '#E70058',
  secondaryLightest: '#FFF4E5',
  secondaryLighter: '#FFE2BE',
  secondaryLight: '#FFD096',
  secondary: '#FEA24C',
  secondaryDarkest: '#E87B41',
  errorLightest: '#FFE5E5',
  errorLighter: '#FF9898',
  errorLight: '#FF6D6D',
  error: '#FF5247',
  errorDarkest: '#D3180C',
  successLightest: '#ECFCE5',
  successLighter: '#7DDE86',
  successLight: '#4CD471',
  success: '#23C16B',
  successDarkest: '#198155',
  spanishGray: '#989898',
  warningLightest: '#FFEFD7',
  warningLighter: '#FFD188',
  warningLight: '#FFC462',
  warning: '#FFB323',
  warningDarkest: '#A05E03',
  notificationLightest: '#C9F0FF',
  notificationLighter: '#9BDCFD',
  notificationLight: '#6EC2FB',
  notification: '#48A7F8',
  notificationDarkest: '#0065D0',
  gradientStart: '#FEA34C',
  gradientEnd: '#FE438D',
  red: '#FF6961',
  redDark: '#D70015',
  orange: '#FFB340',
  orangeDark: '#C93400',
  yellow: '#FFD426',
  yellowDark: '#B25000',
  green: '#30DB5B',
  greenDark: '#248A3D',
  teal: '#70D7FF',
  tealDark: '#0071A4',
  blue: '#409CFF',
  blueDark: '#0040DD',
  indigo: '#7D7AFF',
  indigoDark: '#3634A3',
  purple: '#DA8FFF',
  purpleDark: '#8944AB',
  pink: '#FF6482',
  pinkDark: '#D30F45',
  skin_pink: '#f2cca4',
  golden_bell: '#f08910',
  brown: '#4c2c05',
  grayishLight: '#f8f4f1',
  carrotOrange: '#fd951f',
  orangeYellow: '#f1d569',
  mediumSpringBud: '#c4cb8b',
  darkSkyBlue: '#85bcc1',
};

const getColorOpacity = (color: string, opacity: number): string => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16);
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`;
  }
  return color;
};

export {colors, getColorOpacity};
