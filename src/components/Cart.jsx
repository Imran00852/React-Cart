import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, subtotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const increment = (id) => {
    dispatch({
      type: "addCartItem",
      payload: { id },
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteItem",
      payload: id,
    });
    dispatch({
      type: "calculatePrice",
    });
  };
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              name={item.name}
              imgSrc={item.imgSrc}
              price={item.price}
              id={item.id}
              qty={item.quantity}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No items yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal: ${subtotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  name,
  imgSrc,
  price,
  id,
  qty,
  decrement,
  increment,
  deleteHandler,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt="" />
    <article>
      <h3>{name}</h3>
      <p>{price}</p>
    </article>
    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;
