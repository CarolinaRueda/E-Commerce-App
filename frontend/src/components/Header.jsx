import { BsCart2, BsCartFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { BiClipboard, BiLogIn, BiLogOut } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { getCartId, getCartItems } from "../features/cart/cartSlice";

import { useEffect } from "react";
import { loadOrders } from "../features/orders/orderSlice";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (pathname.includes("success")) return;

    dispatch(getCartId(user.id)).then(({ payload: { id } }) =>
      dispatch(getCartItems(id))
    );
    dispatch(loadOrders(user.id));
  }, [dispatch, user, pathname]);

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>E-Commerce App</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/products'>
                <HiOutlineShoppingBag /> Products
              </Link>
            </li>
            <li>
              {items.length ? (
                <>
                  <Link to='/cart'>
                    <BsCartFill /> Cart
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/cart'>
                    <BsCart2 /> Cart
                  </Link>
                </>
              )}
            </li>
            <li>
              <Link to='/orders'>
                <BiClipboard /> Orders
              </Link>
            </li>
            <li>
              <Link to='/user'>
                {user.picture ? (
                  <img src={user.picture} alt='user pic' />
                ) : (
                  <AiOutlineUser />
                )}
                User
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <BiLogOut /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/products'>
                <HiOutlineShoppingBag /> Products
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <BiLogIn /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <AiOutlineUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
