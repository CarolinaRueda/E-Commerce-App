import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { stripeCheckout } from "../API/stripe";
import Spinner from "../components/Spinner";
import { deleteAllItems } from "../features/cart/cartSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, isLoading: isLoadingUser } = useSelector((state) => state.auth);
  const {
    items,
    cartId,
    isLoading: isLoadingCart,
  } = useSelector((state) => state.cart);

  const onDelete = () => {
    dispatch(deleteAllItems({ userId: user.id, cartId }));
  };

  if (isLoadingUser || isLoadingCart) {
    return <Spinner />;
  }

  return (
    <div className='container cart'>
      <section className='heading'>
        <h1>Cart</h1>
        <p>
          {items.length ? (
            <>
              <span>{user.first_name}</span>, this is all your products
            </>
          ) : (
            <>
              <span>{user.first_name}</span> your cart is empty for now, please
              add some products.
            </>
          )}
        </p>
      </section>
      <div className='cart-container'>
        <div className='cart-list'>
          {items.length ? (
            <>
              {items.map((item, idx) => (
                <CartItem key={idx} item={item} />
              ))}
              <button onClick={onDelete} className='btn cart-btt'>
                Delete all
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {items.length ? (
          <div className='total-cart'>
            <p>
              Your total is: {""}
              <span style={{ fontWeight: 600 }}>
                {Math.round(
                  items.reduce(
                    (acc, el) =>
                      acc +
                      Number(
                        el.price.substring(1).replace(",", ".") * el.quantity
                      ),
                    0
                  )
                ).toFixed(2)}
              </span>
            </p>
            <button onClick={() => stripeCheckout(items)}>
              Proceed to checkout <IoBagCheckOutline className='cart-svg' />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;
