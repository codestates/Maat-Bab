//actions type
export const SET_LOGINSTATUS = 'SET_LOGINSTATUS'
export const SET_USERINFO = 'SET_USERINFO'
export const SET_TASTE = 'SET_TASTE'
export const SET_CARD_INFO = 'SET_CARD_INFO'
export const DELETE_USERINFO = 'DELETE_USERINFO'

//actions create functions
export const deleteUserInfo = () => {
    return {
        type: DELETE_USERINFO
    }
}
export const setLoginStatus =  (status) => {
    return {
        type: SET_LOGINSTATUS,
        payload: {status}
    }
}

export const setUserInfo = (user_id, email, name, etiquette, oauth, certification) => {
    return {
        type: SET_USERINFO,
        payload:{
            user_id,
            email,
            name,
            etiquette,
            oauth,
            certification
        }
    }
}

export const setTaste = (taste) => {
    return {
        type: SET_TASTE,
        payload:{
            taste
        }
    }
}

export const setCardInfo = (region, date, time, headcount, restaurant_name, chat_title, chat_content) => {
    return {
        type: SET_CARD_INFO,
        payload:{
            region,
            date,
            time,
            headcount,
            restaurant_name,
            chat_title,
            chat_content
        }
    }
}
