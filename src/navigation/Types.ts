import {ParamListBase} from '@react-navigation/native';
import RouteKey from './RouteKey';
export type KeyAppScreen = keyof typeof RouteKey;
/** Type */

type ViewListTodo = {
  date: string;
};

export interface AppStackParamList extends ParamListBase {
  /** Params */
  [RouteKey.ViewListTodo]: ViewListTodo;
  [RouteKey.AddTodo]: ViewListTodo;
}

export interface MainTabParamList extends ParamListBase {
  /** Params */
}
