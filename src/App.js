import Home from './client/components/Home/Home';
import './client/components/style.scss';
import { useEffect, useState } from 'react';
import Banner from './client/components/Banner/Banner';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './client/components/Login/Login';
import PRoutes from './client/PRoutes';
import { createContext } from "react";

export const UserContext = createContext();

function App() {
  const session = window.localStorage.getItem('session')
  const parsed = JSON.parse(session)
  const loggedIn = parsed && parsed.token ? true : false
  const [user, setUser] = useState({ loggedIn });
  const navigate = useNavigate()

  useEffect(() => {
    if(user.loggedIn) {
      navigate('/home');
    } else {
      window.localStorage.removeItem('session')
    }
    const session = window.localStorage.getItem('session')
    const parsed = JSON.parse(session)
    const sessionId = parsed && parsed.token
    
    fetch('/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({uuid: sessionId})
    }).then(response => response.json())
      .then(data => {
        if(data.status == 200) {
          setUser({loggedIn: true})
        } else {
          setUser({loggedIn: false})
        }
      });
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>
      <Banner />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route element={<PRoutes />}>
          <Route path="/home" element={<Home />} exact/>
        </Route>
      </Routes>
    </UserContext.Provider>
}

export default App;
