import { SET_LOGINSTATUS,SET_USERINFO,SET_TASTE } from "../actions/index";
import { initialState } from "./initialState";

const userREducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_LOGINSTATUS:
      return Object.assign({}, state, {
        isLogin: action.payload.status
      })
    // case SET_LOGOUT_STATUS:
    case SET_USERINFO:
      return Object.assign({}, state, {
        userInfo: {
          email: action.payload.email,
          name: action.payload.name,
          etiquette: action.payload.etiquette,
          oauth: action.payload.oauth,
          certification: action.payload.certification
        }
      })
      case SET_TASTE:
      return Object.assign({}, state, {
        userInfo:{
          taste: action.payload.taste
        }
      })
    default:
      return state;
  }
}

export default userREducer;
