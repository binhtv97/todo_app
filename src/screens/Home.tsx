import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '@components/Container';
import {pw} from '@themes/metrics';
import {colors} from '@themes/colors';
import CalendarPicker from 'react-native-calendar-picker';
import {CustomButton} from '@components/Button';
import {Space} from '@components/Space';
import {getDate} from '@utilities/date';
import {navigate} from '@navigation/RootNavigation';
import RouteKey from '@navigation/RouteKey';

const Home = () => {
  const [date, setDate] = useState<string>(getDate(new Date().toDateString()));

  return (
    <Container hasBack={false} isShowHeader={false} style={styles.container}>
      <CalendarPicker
        onDateChange={time => {
          setDate(getDate(time.toString()));
        }}
        customDatesStyles={[
          {
            date: '13-05-2024',
            textStyle: {
              color: 'red',
            },
          },
        ]}
      />
      <Space height={20} />
      <CustomButton
        label={[{text: 'View', style: styles.buttonText}]}
        style={styles.button}
        disabled={date === ''}
        onPress={() => {
          navigate(RouteKey.ViewListTodo, {
            date: date,
          });
        }}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.greenDark,
    width: '60%',
  },
  row: {
    justifyContent: 'space-around',
  },
  item: {
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: colors.black,
    width: '45%',
    height: pw(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
