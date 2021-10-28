import { useEffect } from 'react'
import axios from 'axios'

const Oauth = () => {
  // 카카오에서 준 인증코드
  const code = window.location.search.substr(1).split('=')[1]
  

  useEffect(() => {
    console.log(code)
    // main()
  }, [])


  const main = async() => {
    // axios.post('http://locallhost:80/oauth/kakao',{code:code})
  }
  // const main = async () => {
  //   if (code === null || code === "") {
  //       alert("카카오에서 코드를 받는데 실패했습니다");
  //       return;
  //   } else {
  //     await new Promise<accessTokenKakao>((resolve) => {
  //       getKakaoTokenHandler(resolve, code.toString())
  //     });
  //     // await loadUserInfo(accessToken)
  //   }
  // }
  

  // const getKakaoTokenHandler = async (resolve: any, code: string) => {
  //   const url = "/oauth2/authorization/kakao"
  //   await axios.get(url, {params: {code}})
  //   .then((res) => {
  //     console.log("res: ", res)
  //     resolve(res.data)
  //   })
  //   .catch((error) => {
  //     console.log(error.response)
  //     resolve(null)
  //   })
  // }

  return (
    <>
        카카오 로그인 중
    </>
  )
}


export default Oauth