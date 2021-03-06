import React, { useEffect } from 'react';
import axios from 'axios';
import Loading from '../Component/Loading';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../actions';

const OauthKakao = () => {
  // 카카오에서 준 인증코드
  const code = window.location.search.substr(1).split('=')[1];
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(code);
    main();
  }, []);

  const moveAbout = () => {
    document.location.href = '/';
  };

  const main = () => {
    if (code === null || code === '') {
      alert('카카오에서 코드를 받는데 실패했습니다');
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/kakao`,
          {
            code: code,
          }
        )
        .then((res) => {
          const data = res.data;
          if (res.status === 200 || res.status === 201) {
            dispatch(
              setUserInfo(
                data.user_id,
                data.email,
                data.etiqette,
                data.oauth,
                data.certification
              )
            );
            dispatch(setLoginStatus(true));
            moveAbout();
          }
        });
    }
  };

  return (
    <>
      <Loading />
    </>
  );
};

export default OauthKakao;
