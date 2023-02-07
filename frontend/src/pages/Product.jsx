import { BsCart2 } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addItems, deleteItems } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quant, setQuant] = useState(1);
  const [inCart, setInCart] = useState(false);
  const { id, name, description, quantity, price, stripe, image } = product;
  const { user } = useSelector((state) => state.auth);
  const { cartId, items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items.some((item) => item.product_id === id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [items, id, name]);

  const onArrow = (e) => {
    if (inCart) {
      return;
    }

    setQuant((prev) => {
      if (e.target.id === "up") {
        if (prev === quantity) {
          return prev;
        }
        return prev + 1;
      } else {
        if (prev === 1) {
          return prev;
        }
        return prev - 1;
      }
    });
  };

  const onCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (inCart) {
      return;
    }

    if (cartId) {
      const newItem = await dispatch(
        addItems({
          quantity: quant,
          userId: user.id,
          productId: id,
          cartId,
          stripe: stripe,
        })
      );

      if (newItem.payload.item.id) {
        dispatch(
          addItem({
            product_id: id,
            product_name: name,
            product_description: description,
            price,
            quantity: quant,
            stripe: stripe,
          })
        );
      }
      setQuant(1);
    }
  };

  const onDelete = () => {
    dispatch(deleteItems({ productId: id, userId: user.id, cartId }));
  };

  return (
    <div className='product'>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <div className='info-product'>
        <p>Description: {description}</p>
        <p>
          Price: <span>{price}</span>
        </p>
        <p>
          Stock Quantity: {""}
          <span>{!!quantity ? quantity : "Not Available for now"}</span>
        </p>
      </div>
      <div className='buttons'>
        {!inCart ? (
          <>
            <button id='down' onClick={onArrow}>
              <IoIosArrowBack />
            </button>
            <span>{quant}</span>
            <button id='up' onClick={onArrow}>
              <IoIosArrowForward />
            </button>
            <button onClick={onCart}>
              Add to Cart <BsCart2 className='cart-svg' />
            </button>
          </>
        ) : (
          <div>
            <button onClick={onDelete}>
              Delete from your cart <BsTrash className='cart-svg' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
