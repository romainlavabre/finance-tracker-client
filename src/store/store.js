import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit'
import util from "../store/util";
import api from "../store/api";
import history from "../store/history";
import operator from "../store/operator";
import technicalSupport from "./technicalSupport.js";
import background from "./background";
import humanResource from "./humanResource";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (val) => {
    return true;
}

const getEntries = (value) => Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
})

export const store = configureStore({
    reducer: {
        util: util,
        api: api,
        history: history,
        operator: operator,
        technicalSupport: technicalSupport,
        background: background,
        humanResource: humanResource
    },
    middleware: [serializableMiddleware],
})
