import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import User from "./pages/User";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

function App() {
  return (
    <>
      <Router>
        <div className='container'></div>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Products />} />
          {/* Private Routes */}
          <Route path='/cart/' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/user' element={<User />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
