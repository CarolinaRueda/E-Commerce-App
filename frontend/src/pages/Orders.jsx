//todo create loadOrders
//todo render orders
//todo cancel order

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../features/orders/orderSlice";
import Spinner from "../components/Spinner";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isError, isLoading, message } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(loadOrders(user.id));
  }, [dispatch, isError, message, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Orders</h1>
        <p>This is your order list:</p>
      </section>
      <div className='order-list'>
        {orders.length &&
          orders.map((order, idx) => <Order key={idx} order={order} />)}
      </div>
    </div>
  );
};

export default Orders;
