import { useDispatch } from 'react-redux';
import { shoppingCartActions } from '../../store/shopping-cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, quantity, total, price } = props.item;

  const handleAddItem = (item) => {
    console.log('Adding item:', item);
    dispatch(shoppingCartActions.addItem(item));
  };

  const handleRemoveItem = (itemId) => {
    console.log('Removing item with ID:', itemId);
    dispatch(shoppingCartActions.removeItem(itemId));
  };

  return (
    <li className={classes.item} key={title}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => handleRemoveItem(id)}>-</button>
          <button onClick={() => handleAddItem({id, title, quantity, total, price})}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
