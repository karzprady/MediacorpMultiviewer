import { configureStore } from "@reduxjs/toolkit";
import MultiviewerSlice from "./multiviewerslice/multiviewer";
export const store = configureStore({
    reducer: {
        mv : MultiviewerSlice,
    }

})

export default store;