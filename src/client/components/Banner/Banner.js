import './Banner.scss';
import React, { useRef, useContext } from 'react';
import AddRecipeModal from '../AddRecipeModal/AddRecipeModal';
import { UserContext } from '../../../App';

function Banner(props) {
  const recipeRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const addSmoothie = e => {
    recipeRef.current.style.display = "block";
  };

  const logout = e => {
    setUser({loggedIn: false})
    window.localStorage.removeItem('session')
  };

    return <div className="header">
    <div className="Title">
      <h1 className="titleName">My Smoothies</h1>
      {user.loggedIn &&  <button onClick={addSmoothie} className='recipe-button'>Add</button>}
    </div>
      {user.loggedIn && <button onClick={logout} className='logout-button'>Logout</button>}
    <AddRecipeModal ref={recipeRef} />
  </div>
}

export default Banner;