import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route, useHistory } from 'react-router-dom';
import Nav from './Component/Nav';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';
import ChatPage from './Pages/ChatPage';
import MakeMeet from './Component/MakeMeet';
import Mypage from './Pages/Mypage';
import SignupPage from './Pages/SignupPage';
import EmailCheckPage from './Pages/EmailCheckPage'
import MannerPage from './Pages/MannerPage';
import PreferecePage from './Pages/PreferecePage'
import Footer from './Component/Footer'
import SignIn from './Component/SignIn'


// path
// 맞밥 약속 참여하기(Main = '/main'), 나의 약속 목록보기(Chat = '/chat'), 약속 만들러가기(MakeMeet = '/makemeet') 
// login, signup, mypage
// 최초 로그인 시 취향 선택, 식사예절 선택


function App() {
  const history = useHistory();


  return (
    <BrowserRouter>
    <div className="app">
      <Nav />
        
      <Switch>     
      <Route path='/login'>
          <SignIn />
        </Route>
        <Route path='/signup'>
            <SignupPage />
          </Route>
          <Route path='/mypage'>
            <Mypage />
          </Route>

        {/* // 회원가입 시 */}
          <Route path='/emailcheck'>
            <EmailCheckPage />
          </Route>

        {/* // 최초 로그인 시 */}
          <Route path='/foodpreference'>
            <PreferecePage />
          </Route>

          <Route path='/usermanner'>
            <MannerPage />
          </Route>
          

        <Route exact path='/'>
          <AboutPage />
        </Route>
        <Route path='/main'>
        <MainPage />
          </Route>
        <Route path='/chat'>
        <ChatPage />
          </Route>
        <Route path='/makemeet'>
        <MakeMeet />
        </Route>

          
      <Footer />
          

      </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
