import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ListingsPage from './pages/ListingsPage';
import BecomeHostPage from "./pages/BecomeHostPage";
import ReportFormPage from "./pages/ReportFormPage";
import ListingDetailsPage from './pages/ListingDetailsPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
          <Route path="/report" element={<ReportFormPage />} />
          <Route path="/listings/:listingId" element={<ListingDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
