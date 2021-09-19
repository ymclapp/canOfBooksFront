import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

// https://auth0.com/docs/libraries/auth0-react#login
const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  console.log(isAuthenticated);
  
  return !isAuthenticated && (
  <button onClick = {loginWithRedirect}>Log In</button>
  );
}

export default LoginButton;
