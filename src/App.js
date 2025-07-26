import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/shopping-cart-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.uiSlice.cartVisible);
  const cart = useSelector((state) => state.shoppingCartSlice);
  const notification = useSelector((state) => state.uiSlice.notification);

  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

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
