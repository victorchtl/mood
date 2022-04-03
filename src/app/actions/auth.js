import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  import AuthDataService from "../services/auth.service";
  export const register = (username, email, password, profilImg) => (dispatch) => {
    return AuthDataService.register(username, email, password, profilImg).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  export const login = (email, password) => async (dispatch) => {
    const response = await AuthDataService.signin({email, password});
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {user: response.data}
    })
  };
  export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    console.log('logout')
    AuthDataService.signout();
    dispatch({
      type: LOGOUT,
    });
  };
  