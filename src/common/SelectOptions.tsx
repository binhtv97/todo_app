import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {FontSizes, metrics, ph, pw} from '@themes/metrics';
import {colors} from '@themes/colors';
import {
  useFieldArray,
  Controller,
  FieldArrayPath,
  Path,
  useFormContext,
} from 'react-hook-form';
import {Error} from '@components/ErrorText';
import {splitItemInListToRow} from '@utilities/utils';
import {Row} from '@components/Row';
import {BORDER_WIDTH_05} from '@themes/theme';

export interface ItemSelectI extends Record<string, any> {
  isSelect?: boolean;
}

interface SelectOptionType<T> {
  [key: string]: Array<T>;
}
export interface SelectOptionsProps<T> {
  name: Path<T>;
  title: string;
  isHideErrorMessage?: boolean;
  itemTextStyle?: StyleProp<TextStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  numberItemARow?: number;
  // key to compare
  filter: keyof ItemSelectI;
  itemTitle: keyof ItemSelectI;
}

const DEFAULT_NUMBER_IN_A_ROW = 3;
const FULLWIDTH_PERCENT = 100;
const ITEM_HEIGHT = ph(40);
const ITEM_BORDER = pw(12);

export const selectFormMemo: <T>(component: T) => T = memo;

export const SelectOptions = selectFormMemo(
  <T extends object = object>({
    name,
    itemTextStyle,
    titleTextStyle,
    title,
    filter,
    itemTitle,
    isHideErrorMessage = false,
    style,
    numberItemARow = DEFAULT_NUMBER_IN_A_ROW,
  }: SelectOptionsProps<T>) => {
    const {
      control,
      formState: {errors},
    } = useFormContext<SelectOptionType<ItemSelectI>>();

    const {fields, update} = useFieldArray<
      SelectOptionType<ItemSelectI>,
      FieldArrayPath<SelectOptionType<ItemSelectI>>,
      'idField'
    >({
      control,
      name,
      keyName: 'idField',
    });

    const tagListThreeItemARow = useMemo(
      () => splitItemInListToRow(numberItemARow, fields),
      [fields, numberItemARow],
    );

    const onItemPress = (item: ItemSelectI) => {
      const editedItem = fields.findIndex(obj => obj[filter] === item[filter]);
      update(editedItem, {
        ...item,
        isSelect: !item.isSelect,
      });
    };

    const renderItem = (item: ItemSelectI, index: number) => (
      <Controller
        key={`${index.toString()}-colum`}
        render={() => (
          <Pressable
            style={[
              styles.item,
              {
                flexBasis: `${
                  FULLWIDTH_PERCENT / numberItemARow - numberItemARow * 0.5
                }%`,
              },
              fields?.find(fieldItem => fieldItem[filter] === item?.[filter])
                ?.isSelect && styles.itemActive,
            ]}
            onPress={() => onItemPress(item)}>
            <Text numberOfLines={1} style={itemTextStyle}>
              {(item[itemTitle] as string) ?? ''}
            </Text>
          </Pressable>
        )}
        name={`${name}.${index}.id`}
        control={control}
      />
    );

    return (
      <View style={style}>
        {title && (
          <View style={[styles.tagHeaderWrapper, titleTextStyle]}>
            <Text style={styles.tagHeaderText}>{title}</Text>
          </View>
        )}
        <View style={styles.itemView}>
          <View style={styles.itemViewWrapper}>
            {tagListThreeItemARow?.map((item: any) => (
              <Row key={item[0].idField}>{item.map(renderItem)}</Row>
            ))}
          </View>
        </View>
        {!isHideErrorMessage && !!errors?.[name]?.message && (
          <Error errorText={errors?.[name]?.message} />
        )}
      </View>
    );
  },
);
const styles = StyleSheet.create({
  title: {
    fontSize: metrics.title,
    fontWeight: 'bold',
  },
  itemView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemViewWrapper: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  item: {
    marginRight: metrics.xxs,
    marginBottom: metrics.borderRadiusHuge,
    height: ITEM_HEIGHT,
    borderRadius: ITEM_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH_05,
    backgroundColor: colors.skin_pink,
  },
  itemActive: {
    backgroundColor: colors.golden_bell,
  },
  tagHeaderWrapper: {
    marginVertical: metrics.xxs,
  },
  tagHeaderText: {
    fontSize: FontSizes.large,
  },
});
