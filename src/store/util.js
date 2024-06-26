import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    modal: {
        confirm: {
            title: null,
            description: null,
            callback: null,
            open: false
        },
        info: {
            title: null,
            description: null,
            open: false
        },
        alert: {
            title: null,
            description: null,
            type: null,
            duration: null,
            open: false
        }
    },
    form: {
        invalidFields: []
    }
}

export const util = createSlice({
    name: 'util',
    initialState,
    reducers: {
        openConfirm: (state, action) => {
            state.modal.confirm.title = action.payload.title;
            state.modal.confirm.description = action.payload.description;
            state.modal.confirm.callback = action.payload.callback;
            state.modal.confirm.open = true;
        },
        closeConfirm: (state) => {
            state.modal.confirm.title = null;
            state.modal.confirm.description = null;
            state.modal.confirm.callback = null;
            state.modal.confirm.open = false;
        },
        openInfo: (state, action) => {
            state.modal.info.title = action.payload.title;
            state.modal.info.description = action.payload.description;
            state.modal.info.open = true;
        },
        closeInfo: (state) => {
            state.modal.info.title = null;
            state.modal.info.description = null;
            state.modal.info.open = false;
        },
        openAlert: (state, action) => {
            state.modal.alert.title = action.payload.title;
            state.modal.alert.description = action.payload.description;
            state.modal.alert.type = action.payload.type;
            state.modal.alert.duration = action.payload.duration !== null ? action.payload.duration : 3000;
            state.modal.alert.open = true;
        },
        closeAlert: (state) => {
            state.modal.alert.title = null;
            state.modal.alert.description = null;
            state.modal.alert.type = null;
            state.modal.alert.duration = null;
            state.modal.alert.open = false;
        },
        setFormProperty: (state, action) => {
            if (state.form[action.payload.form] === undefined || state.form[action.payload.form] === null) {
                state.form[action.payload.form] = {
                    invalidFields: []
                }
            }

            const result = state.form;

            result[action.payload.form][action.payload.key] = action.payload.value;

            if (!action.payload.isValid) {
                result[action.payload.form].invalidFields.push(action.payload.key);
            } else {
                result[action.payload.form].invalidFields = result[action.payload.form].invalidFields.filter(key => key !== action.payload.key);
            }

            state.form = {...result};
        },
        clearForm: (state, action) => {
            state.form[action.payload.form] = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const {openConfirm, closeConfirm, openInfo, closeInfo, openAlert, closeAlert, setFormProperty, clearForm} = util.actions;

export default util.reducer;
