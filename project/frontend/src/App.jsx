import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import BookingPayment from "./pages/BookingPayment";
// import PaymentConfirmation from "./pages/PaymentConfirmation";
import SearchResults from "./pages/SearchResults";
// import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import "./index.css";

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
