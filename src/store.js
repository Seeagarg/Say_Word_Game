import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tileSliceReducer from "./Slice/EasyTileSlices/tileSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import indexEasyTileSliceReducer from "./Slice/EasyTileSlices/indexEasyTileSlice";
import indexMediumTileSliceReducer from "./Slice/MediumTileSlice/indexMediumTileSlice";
import mediumTileSliceReducer from "./Slice/MediumTileSlice/mediumTileSlice";
import targetWordSliceReducer from "./Slice/targetWordSlice";
import checkWordSliceReducer from "./Slice/checkWordSlice";
import categorySliceReducer from "./Slice/CategoryTileSlice/categorySlice";
import hardTileSliceReducer from "./Slice/HardTileSlice/hardTileSlice";
import modalSliceReducer from "./Slice/modalSlice";

const persistConfig={
    key:'root',
    storage
}

const rootReducer = combineReducers({
    tileSlice:tileSliceReducer,
    indexEasyTileSlice:indexEasyTileSliceReducer,
    indexMediumTileSlice:indexMediumTileSliceReducer,
    mediumTileSlice:mediumTileSliceReducer,
    targetWordSlice:targetWordSliceReducer,
    checkWordSlice:checkWordSliceReducer,
    categorySlice:categorySliceReducer,
    hardTileSlice:hardTileSliceReducer,
    modalSlice:modalSliceReducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer
})


export const persistor = persistStore(store)



// export default store;