import {createSlice} from '@reduxjs/toolkit'
import isNull from "../mixin/global/isNull";

const initialState = {
    tasks: [],
    logs: {}
};

export const background = createSlice({
    name: 'background',
    initialState,
    reducers: {
        put: (state, action) => {
            state.tasks.push(action.payload);
        },
        putLog: (state, action) => {
            let cur = state.logs[action.payload.id];

            if (isNull(cur)) {
                cur = {
                    messages: [],
                    current: null
                }
            }

            if (!isNull(cur.current)) {
                cur.messages.push({
                    date: new Date().toLocaleString(),
                    content: cur.current,
                    success: action.payload.isLastSuccess
                });

                cur.current = null;
            }

            if (!isNull(action.payload.current)) {
                cur.current = action.payload.current;
            }

            state.logs[action.payload.id] = cur;
        },
        terminateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload);
            const task = state.tasks[index];
            task.inProgress = false;
            state.tasks[index] = task;
        }
    },
})

// Action creators are generated for each case reducer function
export const {put, putLog, terminateTask} = background.actions;

export default background.reducer;
