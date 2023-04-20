import Cookies from 'js-cookie';
import { useState } from 'react';

export const useJwtCookie = (tokenKey) => {
  const [jwtToken, setJwtToken] = useState(() => {
    const token = Cookies.get(tokenKey);
    return token || '';
  });

  const setToken = (token) => {
    Cookies.set(tokenKey, token, { secure: true, sameSite: 'strict', expires: 7 });
    setJwtToken(token);
  };

  const removeToken = () => {
    Cookies.remove(tokenKey, { secure: true, sameSite: 'strict' });
    setJwtToken('');
  };

  return [jwtToken, setToken, removeToken];
}
