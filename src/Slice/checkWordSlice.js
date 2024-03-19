import { createSlice } from "@reduxjs/toolkit";

const initialState={rightWord:false}

const compareWord=({word1,word2})=>{
    console.log(word1,word2)
    for(let i=0;i<word1.length;i++){
        if(word1[i].toUpperCase() === word2[i].toUpperCase()){
            continue;
        }
        else{
            return false;
        }
    }
    return true;
}

const checkWordSlice = createSlice({
    name:"checkWordSlice",
    initialState:initialState,
    reducers:{
        checkWord:(state,action)=>{
            console.log(action.payload)
            state.rightWord = compareWord(action.payload);
            console.log(state.rightWord)
            return state;
        },
        resetStateRightWord:(state,action)=>{
            state.rightWord = false;
            return state;
        }
    }
})

export const {checkWord,resetStateRightWord} = checkWordSlice.actions;
export default checkWordSlice.reducer;