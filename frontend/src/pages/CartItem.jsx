import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { deleteItems } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const {
    product_id,
    product_name,
    product_description,
    quantity,
    price,
    image,
  } = item;
  const { user } = useSelector((state) => state.auth);
  const { cartId } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteItems({ productId: product_id, userId: user.id, cartId }));
  };

  return (
    <div className='cart-item'>
      <div>
        <img src={image} alt={product_name} />
      </div>
      <div className='cart-body'>
        <div className='item-header'>
          <p className='bold item-name'>{product_name}</p>
          <p className='bold item-name'>{price.replace(",", ".")}</p>
        </div>
        <div className='item-header'>
          <section>
            <p className='item-info'>{product_description}</p>
            <p className='item-info'>
              <span className='bold'>Quantity: </span>
              {quantity}
            </p>
          </section>
          <button onClick={onDelete}>
            <BsTrash className='cart-svg' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
