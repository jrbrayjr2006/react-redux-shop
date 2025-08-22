import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment, use } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.uiSlice.cartVisible);
  const cart = useSelector((state) => state.shoppingCartSlice);
  const notification = useSelector((state) => state.uiSlice.notification);

  // Fetch cart data when the app loads
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message} 
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );  
}

export default App;
