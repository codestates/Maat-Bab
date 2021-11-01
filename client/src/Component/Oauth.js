import React,{ useEffect } from 'react'
import axios from 'axios'
import Loading from '../Component/Loading'
const Oauth = () => {
  // 카카오에서 준 인증코드
  const code = window.location.search.substr(1).split('=')[1]
  

  useEffect(() => {
    console.log(code)
    main()
  }, [])


  
  
  const main = () => {
    if (code === null || code === "") {
        alert("카카오에서 코드를 받는데 실패했습니다");
        return;
    } else {
      axios.post('http://locallhost:80/oauth/kakao',{code:code})
      .then((res) => console.log(res.data))
      
    }
  }
  

  return (
    <>
       <Loading />
    </>
  )
}


export default Oauth
