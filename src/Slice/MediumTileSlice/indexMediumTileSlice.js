import { createSlice } from "@reduxjs/toolkit";


const initialState={mediumTileIndex:1}

const indexMediumTileSlice = createSlice({
    name:"indexMediumTileSlice",
    initialState:initialState,
    reducers:{
        increaseMediumTileIndex:(state,action)=>{
            console.log(state.mediumTileIndex,"index to increase");
            state.mediumTileIndex = state.mediumTileIndex+1;
            return state;
        },
        decreaseMediumTileIndex:(state,action)=>{
            state.mediumTileIndex = state.mediumTileIndex-1;
            return state;
        },
        resetMediumIndex:(state,action)=>{
            state.mediumTileIndex = 1;
            return state;
        }
    }
})

export const {increaseMediumTileIndex,decreaseMediumTileIndex,resetMediumIndex} = indexMediumTileSlice.actions;
export default indexMediumTileSlice.reducer;