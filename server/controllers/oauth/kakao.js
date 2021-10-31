module.exports = {
  get: (req, res) => {
    console.log(`
    get kakao
    params : ${req.params}
    req : ${req}`);
    res.status(200).send(`get kakao`);
  },
  post: (req, res) => {},
  signin: {
    get: (req, res) => {},
    post: (req, res) => {},
  },
  signout: {},
  signup: {},
  token: {
    get: (req, res) => {},
    post: (req, res) => {},
  },
  userinfo: {
    get: (req, res) => {},
  },
  leave: {
    get: (req, res) => {},
  },
};

// *client_id: String = 앱 REST API 키 3d5f1fdf916d372e883f1a5a9b993c5f
// *redirect_uri: String = 인가 코드가 리다이렉트 될 URI
// *response_type: String = code 로 고정
// state: String = 로그인 요청과 콜백 간에 상태를 유지하기 위해 사용되는 임의의 문자열(정해진 형식 없음)
//                 Cross-Site Request Forgery(CSRF) 공격으로부터 보호하기 위해 해당 파라미터 사용을 권장함
