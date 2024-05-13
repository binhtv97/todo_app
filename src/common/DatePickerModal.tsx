import moment from 'moment';
import React from 'react';
import DatePicker from 'react-native-date-picker';
export interface DatePickerModalProps {
  visible: boolean;
  onSubmit: (res: string, timestam: number) => void;
  onClose: () => void;
}
const DatePickerModal = ({
  visible,
  onClose,
  onSubmit,
}: DatePickerModalProps) => {
  return (
    <DatePicker
      modal
      open={visible}
      date={new Date()}
      is24hourSource={'locale'}
      onConfirm={date => {
        onSubmit(moment(date).format('HH:mm'), moment(date).unix());
        onClose();
      }}
      onCancel={() => {
        onClose();
      }}
      mode="time"
      confirmText={'Submit'}
    />
  );
};

export default DatePickerModal;
