import { uiActions } from './ui-slice';
import { shoppingCartActions } from './shopping-cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const response = await fetch('https://react-store-db-1a6ed-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                throw new Error('Fetching cart data failed.');
            }
            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchRequest();
            dispatch(shoppingCartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }));
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-store-db-1a6ed-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT', 
            body: JSON.stringify(cart)
            });

            if(!response.ok) {
                throw new Error('Sending cart data failed.');
            }

            const responseData = await response.json();
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data sent successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
        console.log('Cart data sent successfully:', cart);
    };
};