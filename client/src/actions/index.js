//actions type
export const SET_LOGINSTATUS = 'SET_LOGINSTATUS'
export const SET_USERINFO = 'SET_USERINFO'
export const SET_TASTE = 'SET_TASTE'
export const SET_CARDLIST = 'SET_CARDLIST'

//actions create functions

export const setLoginStatus =  (status) => {
    return {
        type: SET_LOGINSTATUS,
        payload: {status}
    }
}

export const setUserInfo = (email, name, etiquette, oauth, certification) => {
    return {
        type: SET_USERINFO,
        payload:{
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

export const setCardList = (region, date, time, headcount, restaurant_name, chat_title, chat_content) => {
    return {
        type: SET_CARDLIST,
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
