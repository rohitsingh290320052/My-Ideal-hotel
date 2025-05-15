import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Rooms from "./Pages/Rooms";
import RoomDetail from "./Pages/RoomDetail";
import Restaurant from "./Pages/Restaurant";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import BookingPayment from "./pages/BookingPayment";
// import PaymentConfirmation from "./pages/PaymentConfirmation";
import SearchResults from "./Pages/SearchResults";
// import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import "./index.css";
import CreateRoom from "./Pages/CreateRoom";


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/CreateRoom" element={<CreateRoom/>} />
            {/* <Route path="/hotel/:hotelName" element={<HotelDetail />} /> */}
            {/* <Route path="/rooms/:hotelName" element={<Rooms />} /> */}
            {/* <Route path="/rooms/:hotelName/:roomId" element={<RoomDetail />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/booking-payment" element={<BookingPayment />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} /> */}
            <Route path="/search" element={<SearchResults />} />
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;