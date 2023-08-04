import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./cartPage.css";
const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };

  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
        </main>
      </Layout>
    );
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem">
                  <div className="itemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity}</div>
                  <div className="btnGroup">
                    <button onClick={() => decHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummery total={total} cart={cart} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummery = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cartSummery">
      <h2 style={{ marginBottom: "30px" }}>Cart summery</h2>
      <div className="summeryItem">
        <p>original total price</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className="summeryItem">
        <p>cart discount</p>
        <p>{originalTotalPrice - total}</p>
      </div>
      <div className="summeryItem net">
        <p>net price</p>
        <p>{total} $</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Go to checkout
        </button>
      </Link>
    </section>
  );
};
