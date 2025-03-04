import Home from "./components/Home";
import Cart from "./components/Cart";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CheckoutForm from "./components/CheckoutForm"; 
import CheckoutPage from "./components/CheckoutPage"; // Assuming this component exists
import Footer from "./components/Footer"; // Assuming this component exists
import ForgotPassword from "./components/ForgotPassword"; // Assuming this component exists
import Account from "./components/Account";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Header from './components/Header';

const USER_TYPES = {
  PUBLIC: 'Public User',
  NORMAL: 'Normal User',
  ADMIN: 'Admin User'
}

const CURRENT_USER = USER_TYPES.PUBLIC;

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="checkoutPage" element={<CheckoutPage />} />
        <Route path="checkoutForm" element={<CheckoutForm />} />
        <Route path="footer" element={<Footer />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="categories" element={<Categories />} />
        <Route path="productDetails" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
        <Route path="admin" element={<AdminElement><Admin /></AdminElement>} />
        <Route path="*" element={<div>PAGE NOT FOUND !!!</div>} />
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  if (CURRENT_USER === 'Normal User' || CURRENT_USER === 'Admin User') {
    return <>{children}</>;
  } else {
    return <div>You don't have access to this page</div>;
  }
}

function AdminElement({ children }) {
  if (CURRENT_USER === 'Admin User') {
    return <>{children}</>;
  } else {
    return <div>You don't have access to this page</div>;
  }
}

export default App;