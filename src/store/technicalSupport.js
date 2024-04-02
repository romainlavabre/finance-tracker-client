import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentIssueId: null
}

export const technicalSupport = createSlice({
    name: 'technicalSupport',
    initialState,
    reducers: {
        put: (state, action) => {
            state.currentIssueId = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {put} = technicalSupport.actions;

export default technicalSupport.reducer;
