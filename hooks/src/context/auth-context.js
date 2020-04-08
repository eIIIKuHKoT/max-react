import React, {useState} from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {
  
  }
});

const AuthContextProvider = props => {
  const [isAuth, setAuth] = useState(false);
  const loginHandler = () => {
    setAuth(true);
  };
  return (
    <AuthContext.Provider value={{login: loginHandler, isAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
