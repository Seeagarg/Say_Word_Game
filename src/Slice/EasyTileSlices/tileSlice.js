import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oneEasyTile:"",
    twoEasyTile:"",
    threeEasyTile:"",
    ThreeLetterWord:"",
}

const tileSlice = createSlice({
    name:"tileSlice",
    initialState:initialState,
    reducers:{
        addOneEasyTile:(state,action)=>{
            state.oneEasyTile = action.payload
            return state;
        },
        addTwoEasyTile:(state,action)=>{
            state.twoEasyTile = action.payload
            return state;
        },
        addThreeEasyTile:(state,action)=>{
            state.threeEasyTile = action.payload
            return state;
        },
        removeOneEasyTile:(state,action)=>{
            state.oneEasyTile = ""
            return state;
        },
        removeTwoEasyTile:(state,action)=>{
            state.twoEasyTile = ""
            return state;
        },
        removeThreeEasyTile:(state,action)=>{
            state.threeEasyTile = ""
            return state;
        },
        addThreeLetterWord:(state,action)=>{
            state.ThreeLetterWord = state.oneEasyTile + state.twoEasyTile + state.threeEasyTile;
            return state;
        },
        removeThreeLetterWord:(state,action)=>{
            state.ThreeLetterWord = "";
            return state;
        }
    }
})

export const {addOneEasyTile,addTwoEasyTile,addThreeEasyTile,removeOneEasyTile,removeTwoEasyTile,removeThreeEasyTile,addThreeLetterWord,removeThreeLetterWord} = tileSlice.actions
export default tileSlice.reducer;