import { createSlice } from "@reduxjs/toolkit";

const initialState={easyTileIndex:1}
const indexEasyTileSlice = createSlice({
    name:'indexEasyTileSlice',
    initialState:initialState,
    reducers:{
        increaseIndex:(state,action)=>{
            console.log(state.easyTileIndex,"index to increase");
            state.easyTileIndex = state.easyTileIndex+1;
            return state;
        },
        decreaseIndex:(state,action)=>{
            state.easyTileIndex = state.easyTileIndex-1;
            return state;
        },
        resetEasyIndex:(state,action)=>{
            state.easyTileIndex = 1;
            return state;
        }

    }
})

export const {increaseIndex,decreaseIndex,resetEasyIndex} = indexEasyTileSlice.actions;
export default indexEasyTileSlice.reducer;