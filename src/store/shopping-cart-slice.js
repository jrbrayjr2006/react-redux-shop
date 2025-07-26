import { createSlice } from '@reduxjs/toolkit';

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

export const shoppingCartActions = shoppingCartSlice.actions;
export default shoppingCartSlice;