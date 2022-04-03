/* eslint-disable import/no-anonymous-default-export */
// import {
//     LIKE_MOOD,
//     UNLIKE_MOOD
// } from "../actions/types";

// const initialState = {
//     likes: []
// }

// export default function (state = initialState, action) {
//     const { type, payload } = action;
//     switch (type) {
//         case LIKE_MOOD:
//             return {
//                 ...state,
//                 likes: [
//                     ...state.likes,
//                     {
//                         userId: state.userId,
//                         likeId: payload.likeId
//                     }
//                 ]
//             }
//         case UNLIKE_MOOD:
//             return {
//                 ...state,
//                 likes: state.likes.filter(
//                     (like) => like.likeId === payload.likeId
//                 )
//             }
//         default:
//             return state;
//     }
// }

/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LIKE_SUCCESS,
    SET_LIKES,
} from "../actions/types";

const initialState = {
    likes: []
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIKE_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case SET_LIKES:
            return {
                ...state,
                likes: payload.likes[0].data,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}