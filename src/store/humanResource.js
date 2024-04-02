import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentDocumentId: null,
    currentForm: null
}
export const humanResource = createSlice({
    name: "humanResource",
    initialState,
    reducers: {
        putDocumentId: (state, action) => {
            state.currentDocumentId = action.payload;
        },
        putForm: (state, action) => {
            state.currentForm = action.payload;
        }
    }
})

export const {putDocumentId, putForm} = humanResource.actions;

export default humanResource.reducer;