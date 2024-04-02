import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    adminIds: []
}

export const operator = createSlice({
    name: 'operator',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.adminIds = state.adminIds.filter(id => id != action.payload);
        },
        put: (state, action) => {
            if (!state.adminIds.includes(action.payload)) {
                state.adminIds.push(action.payload);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {put, remove} = operator.actions;

export default operator.reducer;
