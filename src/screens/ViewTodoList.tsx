import {FlatList, StyleSheet, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Container from '@components/Container';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '@navigation/Types';
import RouteKey from '@navigation/RouteKey';
import {getAppState} from '@store/selectors/app';
import {ITodo} from '@store/types';
import {getDate} from '@utilities/date';
import TodoItem from '@common/TodoItem';
import {navigate} from '@navigation/RootNavigation';
import moment from 'moment';

type Props = NativeStackScreenProps<AppStackParamList, RouteKey.ViewListTodo> &
  PropsWithChildren;
const ViewTodoList: React.FC<Props> = props => {
  const date =
    props.route.params.date ?? getDate(moment().format('DD/MM/YYYY'));

  const data: ITodo[] = useSelector(getAppState)[date] || [];

  const onAdd = () => {
    navigate(RouteKey.AddTodo, {
      date: date,
    });
  };

  if (!data) {
    return (
      <Container
        titileHeader="TODO"
        style={styles.container}
        iconRight={[
          {
            icon: 'ic_add',
            onPress: onAdd,
          },
        ]}>
        {!data && <Text>YOU DONT HAVE ANY TASK</Text>}
      </Container>
    );
  }
  return (
    <Container
      titileHeader="TODO"
      style={styles.container}
      iconRight={[
        {
          icon: 'ic_add',
          onPress: onAdd,
        },
      ]}>
      <FlatList
        data={data}
        renderItem={({item}) => <TodoItem item={item} date={date} />}
      />
    </Container>
  );
};

export default ViewTodoList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
