import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import like from "./like";
export default combineReducers({
  auth,
  message,
  like
});
