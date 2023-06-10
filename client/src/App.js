import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CampsMapView } from './pages/CampsMapView'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { UserAccessView } from './pages/global/UserAccessView'
import { AdminLayout } from "./layouts/AdminLayout"
import { Dasboard } from "./pages/admin/Dasboard"
import { EditCamping } from "./pages/admin/EditCamping"
import { AddCamping } from "./pages/admin/AddCamping"
import { UserProvider } from './context/UserContext';

import './App.scss'


const App = () => {

  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Front pages route */}
            <Route path="/CampingMap.API/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="campings" element={<CampsMapView />} />

                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>

            {/* Pages without layout */}
            <Route path="sign-in" element={<UserAccessView />}/>
            
            {/* Admin pages route */}
            <Route path="dashboard" element={<AdminLayout />}>
              <Route index element={<Dasboard />} />
              <Route path="add-camping" element={<AddCamping />} />
              <Route path="edit-camping/:id" element={<EditCamping />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
