import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Brijwasi</h1>
        <p className="text-gray-600 mt-4">Book hotel rooms & reserve tables with ease.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
