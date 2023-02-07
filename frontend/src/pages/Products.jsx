import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productSlice";
import Spinner from "../components/Spinner";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || products.length) {
      return;
    }

    dispatch(loadProducts());
  }, [dispatch, isSuccess, products, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Products</h1>
        <p>These are our products, made exclusively for you.</p>
      </section>
      <div className='product-list'>
        {products.length &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
