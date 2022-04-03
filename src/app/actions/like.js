import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  LIKE_SUCCESS,
  LIKE_FAIL,
  SET_LIKES
} from "./types";

import LikeDataService from "../services/like.service";

export const likemood = ({userId, moodId}) => (dispatch) => {
  return LikeDataService.create(userId, moodId).then(
    (response) => {
      dispatch({
        type: LIKE_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LIKE_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const getLikes = (userId) => (dispatch) => {
  return LikeDataService.findByUserId({userId}).then(
    (data) => {
      dispatch({
        type: SET_LIKES,
        payload: { likes: [data] },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};