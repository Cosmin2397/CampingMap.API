import { createContext, useEffect } from 'react'
import { useGetQuery } from '../hooks/useGetQuery'
import jwt_decode from 'jwt-decode'


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const {getRequest, data: authUser, loading: loadingAuthUser, error} = useGetQuery('Auth/current')

  useEffect(() => {
    getRequest()
  }, [])

  return (
    <UserContext.Provider value={{ authUser, loadingAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};
