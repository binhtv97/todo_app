import React, {useCallback, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextLayoutEventData,
  TextStyle,
} from 'react-native';
import {NUMBER_OF_LINES} from '@themes';

interface ReadMoreTextProps {
  text: string;
  textStyle: StyleProp<TextStyle>;
  readMoreStyle?: StyleProp<TextStyle>;
}

export const ReadMoreText = ({
  text,
  textStyle,
  readMoreStyle,
}: ReadMoreTextProps) => {
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [textShown, setTextShown] = useState<boolean>(false);
  const [numLines, setNumLines] = useState<number | undefined>(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : NUMBER_OF_LINES.TWO_LINE);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > NUMBER_OF_LINES.TWO_LINE && !textShown) {
        setShowMoreButton(true);
        setNumLines(NUMBER_OF_LINES.TWO_LINE);
      }
    },
    [textShown],
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={numLines}
        ellipsizeMode="tail">
        <Text style={textStyle}>{text}</Text>
      </Text>
      {showMoreButton ? (
        <Text onPress={toggleTextShown} style={{color: 'red'}}>
          {textShown ? 'Less' : ' Read More'}
        </Text>
      ) : null}
    </>
  );
};
