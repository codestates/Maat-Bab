import React,{ useEffect } from 'react'
import axios from 'axios'
import Loading from '../Component/Loading'
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../actions';
import { useHistory } from 'react-router-dom';

const Oauth = () => {
  // 카카오에서 준 인증코드
  const code = window.location.search.substr(1).split('=')[1]
  const dispatch = useDispatch();
  const initail = useSelector(state => state.userReducer);
  const history = useHistory();
  

  useEffect(() => {
    console.log(code)
    main()
  }, [])


  
  
  const main = () => {
    if (code === null || code === "") {
        alert("카카오에서 코드를 받는데 실패했습니다");
        return;
    } else {
      axios.post('http://localhost:80/oauth/kakao',{code:code})
      .then((res) => {
        const data = res.data
        if(res.status === 200){
          dispatch(setUserInfo(data.user_id, data.email, data.etiqette, data.oauth, data.certification))
          dispatch(setLoginStatus(true))
          history.push('/')
        }
      })
      
    }
  }
  
  return (
    <>
       <Loading />
    </>
  )
}


export default Oauth
