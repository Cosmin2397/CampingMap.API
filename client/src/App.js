import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CampsMap } from './components/CampsMap'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { UserAccessView } from './pages/global/UserAccessView'

import './App.scss'
import { AdminLayout } from "./layouts/AdminLayout"
import { Dasboard } from "./pages/admin/Dasboard"

const AUTH_USER = {
  name: 'Test',
  email: 'test@example.com'
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Front pages route */}
          <Route path="/" element={<MainLayout user={AUTH_USER} />}>
              <Route index element={<Home />} />
              <Route path="camps-map" element={<CampsMap />} />

              <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Route>

          {/* Pages without layout */}
          <Route path="sign-in" element={<UserAccessView />}/>
          
          {/* Admin pages route */}
          <Route path="dashboard" element={<AdminLayout user={AUTH_USER}/>}>
            <Route index element={<Dasboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
