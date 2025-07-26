import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice'; // Adjust the import path as necessary
import classes from './CartButton.module.css';
// import { use } from 'react';

const CartButton = (props) => {
  // const cartItems = useSelector((state) => state.shoppingCartSlice.items);
  const itemCount = useSelector((state) => state.shoppingCartSlice.totalQuantity);
  const dispatch = useDispatch();

  const handleShowCart = () => {
    console.log('Cart button clicked');
    // Here you would typically dispatch an action to show the cart
    dispatch(uiActions.toggleCart());
  };
  
  return (
    <button className={classes.button} onClick={handleShowCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
