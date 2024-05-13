import {StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {ITodo} from "@store/types";
import {ph} from "@themes/metrics";
import {Row, CustomImage, ReadMoreText} from "@components";
import {compareTime} from "@utilities/date";
import {colors} from "@themes/colors";
import {
  onCancelTiggerNotification,
  onCreateTriggerNotification,
} from "../notification/notification";
import {appActions} from "@store/reducers";
import {useDispatch} from "react-redux";
import {Space} from "@components/Space";

const TodoItem = ({item, date}: {item: ITodo; date: string}) => {
  const [status, setStatus] = useState(item.noti);
  const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(appActions.removeTodo({time: date, id: item.id as string}));
  };
  const onFinish = () => {
    dispatch(appActions.changeStatusTodo({time: date, id: item.id as string}));
  };

  const statusColorText = () => {
    if (item.status === "Critical") {
      return colors.primary;
    } else if (item.status === "Finish") {
      return colors.successLighter;
    } else if (item.status === "Pending") {
      return colors.secondaryLight;
    }
    return colors.skyLight;
  };
  return (
    <View style={[styles.item, {backgroundColor: statusColorText()}]}>
      <Row>
        <View style={{flex: 4}}>
          <Row>
            <View style={styles.left}>
              <Text style={styles.title}>Title: </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </Row>
          <Row>
            <View style={styles.left}>
              <Text style={styles.title}>Time Start:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>{item.time_start}</Text>
            </View>
          </Row>
          <Row>
            <View style={styles.left}>
              <Text style={styles.title}>Status:</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.text}>{item.status}</Text>
            </View>
          </Row>
          <Row>
            <View style={styles.left}>
              <Text style={styles.title}>Noti Me:</Text>
            </View>
            <View style={styles.right}>
              <Switch
                value={status}
                disabled={compareTime(item.time_start as string)}
                onChange={({nativeEvent}) => {
                  setStatus(nativeEvent.value);
                  if (nativeEvent.value) {
                    onCreateTriggerNotification({
                      id: item.id,
                      time_start: item.time_start,
                      comment: item.comment,
                      title: item.title,
                    });
                  } else {
                    onCancelTiggerNotification(item.id as string);
                  }
                }}
              />
            </View>
          </Row>
          <Row>
            <View style={styles.left}>
              <Text style={styles.title}>Description:</Text>
            </View>
            <View style={styles.right}>
              <ReadMoreText
                textStyle={styles.title}
                text={item.comment as string}
                readMoreStyle={{color: "black"}}
              />
            </View>
          </Row>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={onRemove}>
            <CustomImage name="ic_close" style={styles.icon} />
          </TouchableOpacity>

          {item.status !== "Finish" && (
            <>
              <Space height={15} />
              <TouchableOpacity onPress={onFinish}>
                <CustomImage name="ic_check" style={styles.icon} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Row>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  item: {
    width: "100%",
    minHeight: ph(100),
    marginBottom: ph(10),
    backgroundColor: colors.sky,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 25,
  },
  text: {
    fontSize: 18,
    lineHeight: 25,
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 3,
  },
  icon: {
    tintColor: "white",
    width: 20,
    height: 25,
  },
  iconView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
