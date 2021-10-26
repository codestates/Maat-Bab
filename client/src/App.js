import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './Component/Nav';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';
import ChatPage from './Pages/ChatPage';
import MakeMeet from './Component/MakeMeet';
import EditInfo from './Component/EditInfo';
<<<<<<< HEAD
import SignupPage from './Pages/SignupPage';
import EmailCheckPage from './Pages/EmailCheckPage'
import MannerPage from './Pages/MannerPage';
=======
import UserManner from './Component/UserManner';
>>>>>>> 04593dd... UserManner 작성
import FoodPreference from './Component/FoodPreference'
import Footer from './Component/Footer'
import SignIn from './Component/SignIn'

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false)
  
  // const [userInfo, setUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    email: '',
    name: '',
    etiquette: null,
  })

  const isAuthenticated = async () => {
    try {
      await axios.get('http://localhost:4000/auth')
        .then(res => {
          if (res.data) setUserInfo(res.data);
          console.log('isAuthenticated func runned')
        })
      .catch(err => console.log('authenticate failed'))
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    isAuthenticated();
  }, [])
  
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
            <SignupPage />
          </Route>
          <Route path='/editinfo'>
            <EditInfo />
          </Route>

        {/* 회원가입 시 */}
          <Route path='/emailcheck'>
            <EmailCheckPage />
          </Route>

          <Route path='/foodpreference'>
            <FoodPreference userInfo={userInfo}/>
          </Route>

          <Route path='/usermanner'>
            <UserManner userInfo={userInfo}/>
          </Route>
          
          <Route exact path='/'>
            {!userInfo.etiquette ? <Redirect to='/foodpreference' /> : <AboutPage />}
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
