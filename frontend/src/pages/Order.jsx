import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../features/orders/orderSlice";

const Order = ({ order }) => {
  const { deliver_date, id, status, total, products } = order;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const statusBackground =
    status === "Success"
      ? "#90b494"
      : status === "Pending"
      ? "#ff9f1c"
      : "#ba181b";

  const today = new Date().getTime();
  const deliveryDate = new Date(deliver_date).getTime();

  useEffect(() => {
    if (today >= deliveryDate && status === "Pending") {
      dispatch(updateStatus({ id, status: "Success" }));
    }
  }, [today, deliveryDate, status, dispatch, id]);

  const onCancel = () => {
    dispatch(updateStatus({ id, status: "Cancelled" }));
  };

  const onShow = () => {
    setShow(!show);
    console.log(products);
  };

  return (
    <div className='order'>
      <div className='order-header'>
        <h4>Order Number: {id}</h4>
        <div className='status'>
          <h4>Status: {status}</h4>
          <div style={{ backgroundColor: statusBackground }}></div>
        </div>
        {status === "Pending" ? (
          <button onClick={onCancel}>Cancel order</button>
        ) : (
          <></>
        )}
      </div>
      <div className='test-container'>
        <div className='test-div'>
          <p>
            Delivery Date: {""}
            <span className='bold'>{deliver_date.split("T")[0]}</span>
          </p>
          <p>Total: {total}</p>
        </div>
        {products.length ? (
          <>
            <button onClick={onShow} className='cancel-button'>
              Show products
            </button>
            {!show ? (
              <></>
            ) : (
              <>
                {products.map((p, idx) => (
                  <div key={idx} className='order-item'>
                    <p className='bold item-name'>{p.product_name}</p>

                    <p className='item-info'>
                      <span className='bold'>Quantity: </span>
                      {p.product_quantity}
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Order;
