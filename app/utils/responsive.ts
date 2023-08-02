import {Dimensions, PixelRatio, Platform} from 'react-native';

export const {width, height, fontScale} = Dimensions.get('window');
const responsiveFontSize = (fontSize: number) => {
  return PixelRatio.roundToNearestPixel(fontSize * fontScale);
};
const widthToDp = (number: number) => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};
const heightToDp = (number: number) => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel(height * (givenHeight / 100));
};
const IsMobileHeight = height < 1000;
const IsMobileWidth = width < 500;
export {
  widthToDp,
  heightToDp,
  responsiveFontSize,
  IsMobileHeight,
  IsMobileWidth,
};
