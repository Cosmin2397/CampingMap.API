import { createContext, useState, useEffect } from 'react'
import { useGetQuery } from '../hooks/useGetQuery'


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const {getRequest, data, loading, error} = useGetQuery('Auth/current')
  useEffect(() => {
    getRequest()
  }, [])
  console.log({ data })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
