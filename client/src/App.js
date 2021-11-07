import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Nav from './Component/Nav';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';
import ChatPage from './Pages/ChatPage';
import MakeMeet from './Component/MakeMeet';
import EditInfo from './Component/EditInfo';
import UserManner from './Component/UserManner';
import FoodPreference from './Component/FoodPreference';
import Footer from './Component/Footer';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import EmailCheck from './Component/EmailCheck';
import OauthKakao from './Component/OauthKakao';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginStatus, deleteUserInfo, setUserInfo } from './actions';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  const [certificationCode, setCertificationCode] = useState('');
  const [email, setEamil] = useState('');

  const isAuthenticated = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/auth`)
        .then((res) => {
          if (res.data) {
            const { user_id, email, name, etiquette, oauth, certification } =
              res.data;
            dispatch(
              setUserInfo(user_id, email, name, etiquette, oauth, certification)
            );
            console.log('isAuthenticated func runned');
          }
        })
        .catch((err) => console.log('authenticate failed'));
    } catch (err) {
      console.log(err);
    }
  };
  const moveAbout = () => {
    document.location.href = '/';
  };
  
  useEffect(() => {
    isAuthenticated();
  }, []);

  const logoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signout`)
      .then((res) => {
        if (res.status === 205) {
          dispatch(setLoginStatus(false));
          dispatch(deleteUserInfo());
          moveAbout();
        }
      })
      .catch((err) => console.log(err));
  };

  const certificationCodeHandler = (code) => {
    setCertificationCode(code);
  };
  return (
    <BrowserRouter>
      <div className='app'>
        <Nav logoutHandler={logoutHandler} />

        <Switch>
          <Route path='/login'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp
              setEamil={setEamil}
              email={email}
              certificationCodeHandler={certificationCodeHandler}
              certificationCode={certificationCode}
            />
          </Route>
          <Route path='/editinfo'>
            <EditInfo />
          </Route>

          {/* 회원가입 시 */}
          <Route path='/emailcheck'>
            <EmailCheck email={email} certificationCode={certificationCode} />
          </Route>

          <Route path='/foodpreference'>
            <FoodPreference userInfo={initial.userInfo} />
          </Route>

          <Route path='/usermanner'>
            <UserManner userInfo={initial.userInfo} />
          </Route>

          <Route exact path='/'>
            {initial.userInfo.certification && !initial.userInfo.etiquette.length ? (
              <Redirect to='/foodpreference' />
            ) : (
              <AboutPage />
            )}
          </Route>

          <Route path='/main'>
            <MainPage isLogin={initial.isLogin} userInfo={initial.userInfo} />
          </Route>

          <Route path='/chat'>
            <ChatPage />
          </Route>

          <Route path='/kakao'>
            <OauthKakao />
          </Route>

          <Route path='/makemeet'>
            <MakeMeet />
          </Route>
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
