import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.shoppingCartSlice.items);
  // const cartVisible = useSelector((state) => state.uiSlice.cartVisible);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        { cartItems.length > 0 ?
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{ id: item.id, title: item.title, quantity: item.quantity, total: item.price * item.quantity, price: item.price }}
            />
          )) : (
            <li className={classes.empty}>
              <p>Your cart is empty.</p>
            </li>
          )}
      </ul>
    </Card>
  );
};

export default Cart;
