import {IInitialState} from './types';

const INITIAL_STATE: IInitialState = {
  app: {
    user: {
      username: '',
      avatar: '',
      number_of_followers: 0,
      number_of_following: 0,
      number_of_post: 0,
      location: '',
      link: '',
      description: '',
      link_tag: [],
      reviews: [],
      posts: [],
    },
    setting: {
      noti_comment: true,
      noti_flower_post: true,
      noti_flower_request: true,
      noti_followers_visible: true,
      noti_like: true,
    },
  },
};

export default INITIAL_STATE;
