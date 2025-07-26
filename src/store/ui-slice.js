import { createSlice } from '@reduxjs/toolkit';

const initialState = {cartVisible: true, notification: null};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.cartVisible = !state.cartVisible;
        },
        showNotification: (state, action) => {
            state.notification = { 
                status: action.payload.status, 
                title: action.payload.title, 
                message: action.payload.message
            };
        },
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;