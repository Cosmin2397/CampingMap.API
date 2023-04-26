import { createContext, useEffect } from 'react'
import { useGetQuery } from '../hooks/useGetQuery'


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
