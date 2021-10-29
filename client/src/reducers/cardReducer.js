import { SET_CARDLIST } from "../actions/index";
import { initialState } from "./initialState";

const userREducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_CARDLIST:
      return Object.assign({}, state, {
        cardInfo: {
          region: action.payload.region,
          date: action.payload.date,
          time: action.payload.time,
          headcount: action.payload.headcount,
          restaurant_name: action.payload.restaurant_name,
          chat_title: action.payload.chat_title,
          chat_content : action.payload.chat_content,
        }
      })
    default:
      return state;
  }
}

export default userREducer;
