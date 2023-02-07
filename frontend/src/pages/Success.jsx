import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartId, getCartItems } from "../features/cart/cartSlice";
import { createOrder } from "../features/orders/orderSlice";

const Success = () => {
  // const { cartId } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    dispatch(getCartId(user.id)).then(({ payload: { id } }) =>
      dispatch(getCartItems(id)).then(({ payload: { items } }) => {
        console.log(items);
        if (!items.length) {
          navigate(`/cart`);
          return;
        }
        const total = items.reduce(
          (acc, el) =>
            acc + Number(el.price.substring(1).replace(",", ".")) * el.quantity,
          0
        );
        dispatch(createOrder({ cartId: id, total, userId: user.id, items }));
      })
    );
  }, [dispatch, user, navigate]);
  return (
    <div className='container'>
      <section className='heading'>
        <div className='center'>
          <h1>
            <p>Your payment was successful!</p>
          </h1>
          <button className='btn' onClick={() => navigate("/orders")}>
            Go to orders
          </button>
        </div>
      </section>
    </div>
  );
};

export default Success;
