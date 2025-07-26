import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialState = {
    items: [],
    totalQuantity: 0,
};

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            console.log('Itemes in cart before addition:', state.items);
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (existingItem) {
                // If the item already exists, increase its quantity and total price
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                // If the item does not exist, add it to the cart
                console.log('Adding new item:', newItem);
                state.items.push(
                    {
                        id: newItem.id,
                        title: newItem.title,
                        price: newItem.price,
                        quantity: 1,
                        totalPrice: newItem.price
                    }
                );
            }
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            // console.log('Removing item:', existingItem);
            console.log('Removing item with ID:', id);
            console.log('the number of items in the cart before removal:', state.totalQuantity);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                //TODO: remove item from cart
                state.items = state.items.filter(item => item.id !== id);
            } else {
                // Decrease the quantity of the item
                existingItem.quantity--;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

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

export const shoppingCartActions = shoppingCartSlice.actions;
export default shoppingCartSlice;