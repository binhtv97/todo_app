import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from './Types';
import RouteKey from './RouteKey';
import Home from '@screens/Home';
import ViewTodoList from '@screens/ViewTodoList';
import AddTodo from '@screens/AddTodo';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
      headerShown: false,
      orientation: 'portrait',
    }}
    initialRouteName={RouteKey.Login}>
    <Stack.Screen name={RouteKey.Home} component={Home} />
    <Stack.Screen name={RouteKey.ViewListTodo} component={ViewTodoList} />
    <Stack.Screen name={RouteKey.AddTodo} component={AddTodo} />
  </Stack.Navigator>
);
