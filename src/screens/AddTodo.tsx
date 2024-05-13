import {StyleSheet, Switch, View} from 'react-native';
import React, {useState} from 'react';
import Container from '@components/Container';
import {FormProvider, useForm} from 'react-hook-form';
import {FormInput} from '@components/FormInput';
import * as yup from 'yup';
import {useYupValidationResolver} from '@hook/useYupValidationResolver';
import {ItemSelectI, SelectOptions} from '@common/SelectOptions';
import {Space} from '@components/Space';
import {ITodo, TStatus} from '@store/types';
import DatePickerModal from '@common/DatePickerModal';
import TitleRequire from '@components/TitleRequire';
import {Row} from '@components/Row';
import {CustomButton} from '@components/Button';
import {
  onCancelTiggerNotification,
  onCreateTriggerNotification,
} from '../notification/notification';
import {compareTime} from '@utilities/date';
import {colors} from '@themes/colors';
import {useDispatch} from 'react-redux';
import {appActions} from '@store/reducers';
import moment from 'moment';

interface Item extends ItemSelectI {
  id: number;
  label: TStatus;
}

const FormSchema = yup.object().shape({
  options: yup.mixed().test({
    message: 'Please select 1 item',
    test: (val): boolean => !!(val as Item[])?.some((it: Item) => it.isSelect),
  }),
  title: yup.string().required('Please enter title!'),
  comment: yup.string(),
  time_start: yup.string().required('Please choose time end!'),
  id: yup.string(),
  noti: yup.boolean(),
  time_stam_end: yup.number(),
});

type FormPayload = yup.InferType<typeof FormSchema>;

const selectData: Item[] = [
  {id: 1, label: 'Doing'},
  {id: 3, label: 'Pending'},
  {id: 4, label: 'Critical'},
];
const AddTodo = () => {
  const formMethods = useForm<FormPayload>({
    resolver: useYupValidationResolver<FormPayload>(FormSchema),
    defaultValues: {
      options: selectData,
      title: '',
      comment: '',
      time_start: '',
      id: Math.random().toString(),
      noti: false,
      time_stam_end: 0,
    },
  });

  const {handleSubmit, setValue, watch} = formMethods;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const onSubmit = (res: FormPayload) => {
    const today = moment().format('DD/MM/YYYY HH:mm');
    const status = res.options as Item[];
    const data: ITodo = {
      id: res.id,
      time_start: res.time_start,
      comment: res.comment,
      title: res.title,
      time_create: today,
      noti: res.noti,
      status: status.find(item => item.isSelect)?.label,
      time_stam_end: res.time_stam_end,
    };
    dispatch(
      appActions.addTodo({
        time: moment().format('DD/MM/YYYY'),
        todo: data,
      }),
    );
  };
  return (
    <Container titileHeader="ADD NEW TODO" style={styles.container}>
      <FormProvider {...formMethods}>
        <FormInput name="title" title="Title" />
        <Space height={10} />
        <SelectOptions
          name="options"
          title="Status"
          filter={'id'}
          itemTitle={'label'}
        />
        <FormInput name="comment" title="Note" description />
        <DatePickerModal
          visible={visible}
          onSubmit={(date, timestam) => {
            setValue('time_start', date);
            setValue('time_stam_end', timestam);
          }}
          onClose={() => {
            setVisible(false);
          }}
        />
        <Space height={10} />
        <FormInput
          name="time_start"
          title="Time End"
          editable={false}
          iconClose={false}
          onPress={() => setVisible(true)}
        />
        <Space height={10} />
        <Row style={{justifyContent: 'space-between'}}>
          <TitleRequire title="Noti me" />
          <Switch
            disabled={
              watch('time_start') === '' ||
              compareTime(watch('time_start') as string)
            }
            value={watch('noti') as boolean}
            onChange={({nativeEvent}) => {
              setValue('noti', nativeEvent.value);
              if (nativeEvent.value) {
                onCreateTriggerNotification({
                  id: watch('id') as string,
                  time_start: watch('time_start'),
                  comment: watch('comment') as string,
                  title: watch('title'),
                });
              } else {
                onCancelTiggerNotification(watch('id') as string);
              }
            }}
          />
        </Row>
        <Space height={10} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomButton
            label={[{text: 'Submit', style: styles.buttonText}]}
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          />
        </View>
      </FormProvider>
    </Container>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.greenDark,
    width: '60%',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
