import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constants";


function AuthInfo({onReg, onAuth}) {
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const handleLogout = () => {
        setCurrentUser(null)
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    return (
    <>
        {
            !currentUser
              ? <React.Fragment>
                  <Link onClick={onReg}>Регистрация</Link>
                  <Link onClick={onAuth}>Авторизация</Link>
              </React.Fragment>
  
              : <React.Fragment>
                  {currentUser.name}
                  <Link onClick={handleLogout}>Выйти</Link>
                </React.Fragment>
        }
    </>
    )
}

export default AuthInfo;