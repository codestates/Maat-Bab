import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route, useHistory } from 'react-router-dom';
import Nav from './Component/Nav';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';
import ChatPage from './Pages/ChatPage';
import MakeMeet from './Component/MakeMeet';
import EditInfo from './Component/EditInfo';
import MannerPage from './Pages/MannerPage';
import PreferecePage from './Pages/PreferecePage'
import Footer from './Component/Footer'
import SignIn from './Component/SignIn'
import SignUp from './Component/SignUp'
import EmailCheck from './Component/EmailCheck'


// path
// 맞밥 약속 참여하기(Main = '/main'), 나의 약속 목록보기(Chat = '/chat'), 약속 만들러가기(MakeMeet = '/makemeet') 
// login, signup, mypage
// 최초 로그인 시 취향 선택, 식사예절 선택


function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false)

  const logoutHandler = () => {

  }
  return (
    <BrowserRouter>
    <div className="app">
      <Nav isLogin={isLogin} logoutHandler={logoutHandler}/>
        
      <Switch>     
      <Route path='/login'>
          <SignIn />
        </Route>
        <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/editinfo'>
            <EditInfo />
          </Route>

        {/* // 회원가입 시 */}
          <Route path='/emailcheck'>
            <EmailCheck />
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

          
          

        </Switch>
        
      <Footer />
      </div>
      </BrowserRouter>
  );
}

export default App;
