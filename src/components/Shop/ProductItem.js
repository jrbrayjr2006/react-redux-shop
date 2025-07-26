import { useDispatch } from 'react-redux';
import { shoppingCartActions } from '../../store/shopping-cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const handleAddItem = (item) => {
    console.log('Adding item:', item);
    dispatch(shoppingCartActions.addItem(item));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={() => handleAddItem({id, title, price})}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
