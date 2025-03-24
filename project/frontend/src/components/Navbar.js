import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">Brijwasi</Link>
      <div className="space-x-4">
        <Link to="/hotel-booking" className="text-gray-600 hover:text-gray-900">Hotel Booking</Link>
        <Link to="/restaurant-booking" className="text-gray-600 hover:text-gray-900">Restaurant Reservation</Link>
      </div>
    </nav>
  );
};

export default Navbar;
