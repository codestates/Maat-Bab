import { SET_LOGINSTATUS,SET_USERINFO,SET_TASTE, DELETE_USERINFO } from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {

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
      case DELETE_USERINFO:
        return Object.assign({}, state, {
          userInfo:{
            email:null,
            name:null,
            etiquette:null,
            oauth:false,
            certification:false,
            taste:null
          }
        })
    default:
      return state;
  }
}

export default userReducer;