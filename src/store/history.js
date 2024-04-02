import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: []
}

export const history = createSlice({
    name: 'history',
    initialState,
    reducers: {
        put: (state, action) => {
            state.items.push(action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const {put} = history.actions;

export default history.reducer;
