import React, { useState,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Authenticate from './components/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const userStored=localStorage.getItem('isLogin')
    if(userStored==='1')
    {
      setIsLoggedIn(true);
    }

  },[])


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLogin','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLogin') 
  };

  return (
      <Authenticate.Provider value={{isLoggedIn:isLoggedIn,
      onLogout:logoutHandler}}>
          <MainHeader/>
          <main>
            {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn && <Home onLogout={logoutHandler} />}
          </main>
        </Authenticate.Provider>
  );
}

export default App;
