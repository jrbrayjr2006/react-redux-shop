import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.uiSlice.cartVisible);
  const cart = useSelector((state) => state.shoppingCartSlice);
  const notification = useSelector((state) => state.uiSlice.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));
      const response = await fetch('CHANGE_ME', {
        method: 'PUT', 
        body: JSON.stringify(cart)
      });

      if(!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      const responseData = await response.json();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Cart data sent successfully!'
      }));
    };
    console.log('Cart updated:', cart);
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    });

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
