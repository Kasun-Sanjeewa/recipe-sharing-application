import { configureStore } from "@reduxjs/toolkit";
import chiefReducer from "./slices/chiefSlice";

const store = configureStore({
    reducer: {
        chiefs: chiefReducer,
    },
});

export default store;
