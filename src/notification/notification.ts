import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {ITodo} from '@store/types';
import {getHourAndMinute} from '@utilities/date';

export async function onCreateTriggerNotification(item: ITodo) {
  // Request permissions (required for iOS)
  try {
    await notifee.requestPermission();
    const {time_end, title, comment, id} = item;
    const {hour, minute} = getHourAndMinute(time_end as string);
    const date = new Date(Date.now());
    date.setHours(hour);
    date.setMinutes(minute);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: id,
        title: title,
        body: comment,
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
    );
  } catch (error) {
    console.log(error);
  }
}

export async function onCancelTiggerNotification(id: string) {
  await notifee.cancelTriggerNotification(id);
}
