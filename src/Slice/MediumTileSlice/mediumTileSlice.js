import { createSlice } from "@reduxjs/toolkit";

const initialState = {fiveLetterWordArray:Array(5).fill(''),fiveLetterWord:""}

const mediumTileSlice=createSlice({
    name:"mediumTileSlice",
    initialState:initialState,
    reducers:{
        addLetterOne:(state,action)=>{
            state.fiveLetterWordArray[0] = action.payload;
            return state;
        },
        addLetterTwo:(state,action)=>{
            state.fiveLetterWordArray[1] = action.payload;
            return state;
        },
        addLetterThree:(state,action)=>{
            state.fiveLetterWordArray[2] = action.payload;
            return state;
        },
        addLetterFour:(state,action)=>{
            state.fiveLetterWordArray[3] = action.payload;
            return state;
        },
        addLetterFive:(state,action)=>{
            state.fiveLetterWordArray[4] = action.payload;
            return state;
        },
        removeLetterOne:(state,action)=>{
            state.fiveLetterWordArray[0] = "";
            return state;
        },
        removeLetterTwo:(state,action)=>{
            state.fiveLetterWordArray[1] = "";
            return state;
        },
        removeLetterThree:(state,action)=>{
            state.fiveLetterWordArray[2] = "";
            return state;
        },
        removeLetterFour:(state,action)=>{
            state.fiveLetterWordArray[3] = "";
            return state;
        },
        removeLetterFive:(state,action)=>{
            state.fiveLetterWordArray[4] = "";
            return state;
        },
        addFiveLetterWord:(state,action)=>{
            console.log(state.fiveLetterWordArray.join(''))
            state.fiveLetterWord = state.fiveLetterWordArray.join('');
            return state;
        },
        removeFiveLetterWord:(state,action)=>{
            state.fiveLetterWord = "";
            return state;
        }
    }
})

export const {addLetterOne,addLetterTwo,addLetterThree,addLetterFour,addLetterFive,addFiveLetterWord,removeFiveLetterWord,removeLetterOne,removeLetterTwo,removeLetterThree,removeLetterFour,removeLetterFive} = mediumTileSlice.actions;
export default mediumTileSlice.reducer;