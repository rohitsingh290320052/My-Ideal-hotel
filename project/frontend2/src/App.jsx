import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HotelsSearchPage from './Pages/HotelSearchPage';
import RoomsPage from './Pages/RoomsPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element ={<LoginPage/>}/>
          <Route path="/Signup" element={<SignupPage/>}/>
          <Route path="/hotels/search" element={<HotelsSearchPage />} />
          <Route path="/rooms/:hotelName" element={<RoomsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App