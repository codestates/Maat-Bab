module.exports = {
  post: (req, res) => {},
  signin: {
    get: (req, res) => {
      //로그인 인가 코드 받기
      //GET /oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code HTTP/1.1
      //https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}
      //Host: kauth.kakao.com
      //parameter
      //client_id = 앱 REST API 키 3d5f1fdf916d372e883f1a5a9b993c5f
      //redirect_uri = 인가 코드가 리다이렉트된 URI
      //response_type = code 고정
      //response
      //로그인 진행
      // HTTP/1.1 302 Found
      // Content-Length: 0
      // Location: {REDIRECT_URI}?code={AUTHORIZE_CODE}
      //code : 토큰 받기 요청에 필요한 인가 코드
      //error
      //로그인 취소
      //HTTP/1.1 302 Found
      // Content-Length: 0
      // Location: {REDIRECT_URI}?error=access_denied&error_description=User%20denied%20access
      //access_denied : User denied access-사용자가 로그인을 취소한 것이므로, 초기 화면으로 이동시키는 등의 조치가 필요합니다.
    },
    post: (req, res) => {
      //로그인 토큰 코드 받기
      //curl -v -X POST "https://kauth.kakao.com/oauth/token" \
      // -H "Content-Type: application/x-www-form-urlencoded" \
      // -d "grant_type=authorization_code" \
      // -d "client_id={REST_API_KEY}" \
      // --data-urlencode "redirect_uri={REDIRECT_URI}" \
      // -d "code={AUTHORIZE_CODE}"
      //parameter
      //grant_type=authorization_code 고정
      //client_id=앱 REST API 키 3d5f1fdf916d372e883f1a5a9b993c5f
      //redirect_uri= 인가 코드가 리다이렉트된 URI
      //code=인가 코드 받기 요청으로 얻은 인가 코드
      //response
      // HTTP/1.1 200 OK
      // Content-Type: application/json;charset=UTF-8
      // {
      //     "token_type":"bearer",
      //     "access_token":"{ACCESS_TOKEN}",
      //     "expires_in":43199,
      //     "refresh_token":"{REFRESH_TOKEN}",
      //     "refresh_token_expires_in":25184000,
      //     "scope":"account_email profile"
      // }
      //token_type=토큰 타입, bearer로 고정
      //access_token=사용자 액세스 토큰 값
      //expires_in=액세스 토큰 만료 시간(초)
      //refresh_token=사용자 리프레시 토큰 값
      //refresh_token_expires_in=리프레시 토큰 만료 시간(초)
    },
  },
  signout: {
    // POST /v1/user/logout HTTP/1.1
    // Host: kapi.kakao.com
    // Authorization: Bearer {ACCESS_TOKEN}
  },
  signup: {},
  token: {
    get: (req, res) => {
      //토큰 정보 보기
      // curl -v -X GET "https://kapi.kakao.com/v1/user/access_token_info" \
      // -H "Authorization: Bearer {ACCESS_TOKEN}"
      //header
      //Authorization=Authorization: Bearer {ACCESS_TOKEN}
      //response
      //HTTP/1.1 200 OK
      // {
      //   "id":123456789,
      //   "expires_in": 7199,
      //   "app_id":1234
      // }
      //id:회원번호
      //expires_in:액세스 토큰 만료 시간(초)
      //app_id:토큰이 발급된 앱 ID
    },
    post: (req, res) => {
      //액세스 토큰과 리프레시 토큰을 갱신하는 API
      //curl -v -X POST "https://kauth.kakao.com/oauth/token" \
      //  -H "Content-Type: application/x-www-form-urlencoded" \
      //  -d "grant_type=refresh_token" \
      //  -d "client_id={REST_API_KEY}" \
      //  -d "refresh_token={USER_REFRESH_TOKEN}"
      //parameter
      //grant_type=refresh_token으로 고정
      //client_id=앱 REST API 키 3d5f1fdf916d372e883f1a5a9b993c5f
      // refresh_token=토큰 발급 시 응답으로 받은 refresh_token
      //response
      //HTTP/1.1 200 OK
      // Content-Type: application/json;charset=UTF-8
      // {
      //     "access_token":"{ACCESS_TOKEN}",
      //     "token_type":"bearer",
      //     "refresh_token":"{REFRESH_TOKEN}",  //optional
      //     "refresh_token_expires_in":25184000,  //optional
      //     "expires_in":43199,
      // }
      //token_type=토큰 타입, bearer로 고정
      //access_token=사용자 액세스 토큰 값
      //expires_in=액세스 토큰 만료 시간(초)
      //refresh_token=갱신된 사용자 리프레시 토큰 값, 기존 리프레시 토큰의 유효기간이 1개월 미만인 경우에만 갱신
      //refresh_token_expires_in=리프레시 토큰 만료 시간(초), 리플레시 토큰이 올 때만 같이 옴
    },
  },
  userinfo: {
    get: (req, res) => {
      // curl -v -X GET "https://kapi.kakao.com/v2/user/me" \
      // -H "Authorization: Bearer {ACCESS_TOKEN}"
      //parameter
      //Authorization=Authorization: Bearer {ACCESS_TOKEN}
      //response
      //id=회원번호
      // kakao_account.profile_image_needs_agreement=boolean 프로필 사진 제공 동의 여부
      // kakao_account.profile.nickname=닉네임
      // kakao_account.profile.thumbnail_image_url=프로필 미리보기 이미지 URL
      // kakao_account.profile.profile_image_url=프로필 사진 URL
      // kakao_account.profile.is_default_image=프로필 사진 URL이 기본 프로필 사진 URL인지 여부
      //HTTP/1.1 200 OK
      // {
      //   "id":123456789,
      //   "kakao_account": {
      //       "profile_needs_agreement": false,
      //       "profile": {
      //           "nickname": "홍길동",
      //           "thumbnail_image_url": "http://yyy.kakao.com/.../img_110x110.jpg",
      //           "profile_image_url": "http://yyy.kakao.com/dn/.../img_640x640.jpg",
      //           "is_default_image":false
      //       },
      //       "email_needs_agreement":false,
      //        "...":"...",
      //   }
      // }
    },
  },
  leave: {
    get: (req, res) => {
      //연결끊기기능=>https만 가능(443 port)
      //모든 정보 삭제/연결 끊기 버튼 통합 여부
      //요청이 get과 post만 있음
      // /oauth/kakao/leave
      //header (액세스 토큰 사용, 앱 어드민 키 사용은 https 후)
      //Authorization : 사용자 인증 수단, 액세스 토큰 값 Authorization: Bearer {ACCESS_TOKEN}
      //response
      //HTTP/1.1 200 OK
      // Content-Type: application/json;charset=UTF-8
      // {
      //     "id":123456789
      // }
      //id=로그아웃된 사용자의 회원번호
    },
  },
};
