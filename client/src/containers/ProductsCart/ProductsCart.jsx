import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./ProductsCart.css";

export default function ProductsCart() {
  const { cartItems, addToCart, removeFromCart, isLoading, error } =
    useContext(CartContext);
  console.log("cart items is", cartItems);

  //Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //explicit conditions for various states
  if (isLoading) return <div>Loading your cart items...</div>;
  if (error) return <div>Failed to load cart items. Please try again</div>;

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart_section">
      <h1 className="cart_heading">Your Cart </h1>
      <hr />
      {cartItems.map((item) => (
        <div key={item._id} className="cart_container">
          <div className="left_cart">
            <img src={item.image} alt="" />
          </div>
          <div className="right_cart">
            <h3> {item.title} </h3>
            <div className="details_row">
              <div className="detail_label">QUANTITY</div>
              <div className="detail_label">PRICE</div>
              <div className="detail_label">TOTAL</div>
            </div>
            <div className="details_row values">
              <div>{item.quantity}</div>
              <div>${item.price}</div>
              <div className="bold_value">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>

            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addToCart(item.productId)}
              >
                Add
              </button>

              <button
                className="cart_btn2"
                onClick={() => removeFromCart(item.productId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>
          Subtotal: <span className="bold_value">${totalPrice.toFixed(2)}</span>
        </h3>
      </div>
    </div>
  );
}
