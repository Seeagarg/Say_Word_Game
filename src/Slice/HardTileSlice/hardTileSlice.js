import { createSlice } from "@reduxjs/toolkit";

const initialState ={hardWordArray:Array(30).fill(''),hardFiveLetterWords:{word1:"",word2:"",word3:"",word4:"",word5:"",word6:""},hardIndex:1,correctWord:""}

const hardTileSlice = createSlice({
    name:"hardTileSlice",
    initialState:initialState,
    reducers:{
        increaseHardIndex:(state,action)=>{
            state.hardIndex = state.hardIndex+1;
            return state;
        },
        decreaseHardIndex:(state,action)=>{
            state.hardIndex = state.hardIndex-1;
            return state;
        },
        resetHardIndex:(state,action)=>{
            state.hardIndex = 1;
            return state;
        },
        resetHardWordArray:(state,action)=>{
            state.hardWordArray=Array(30).fill('');
            return state;
        },
        resetHardWords:(state,action)=>{
            state.hardFiveLetterWords = {word1:"",word2:"",word3:"",word4:"",word5:"",word6:""}
            return state;
        },
        addLetter:(state,action)=>{
            state.hardWordArray[state.hardIndex-1] =  action.payload;
            return state;
        },
        removeLetter:(state,action)=>{
            // console.log("remove",state.hardIndex-1)
            state.hardWordArray[state.hardIndex-2] = " ";
            // console.log(state.hardWordArray[state.hardIndex])
            return state;
        },
        addWordOne:(state,action)=>{
            state.hardFiveLetterWords.word1 = action.payload;
            return state;
        },
        addWordTwo:(state,action)=>{
            state.hardFiveLetterWords.word2 = action.payload;
            return state;
        },
        addWordThree:(state,action)=>{
            state.hardFiveLetterWords.word3 = action.payload;
            return state;
        },
        addWordFour:(state,action)=>{
            state.hardFiveLetterWords.word4 = action.payload;
            return state;
        },
        addWordFive:(state,action)=>{
            state.hardFiveLetterWords.word5 = action.payload;
            return state;
        },
        addWordsix:(state,action)=>{
            console.log(action.payload,'0---')
            state.hardFiveLetterWords.word6 = action.payload;
            return state;
        },
        addRightWord:(state,action)=>{
            state.correctWord = action.payload;
            return state;

        }
    }
})

export const {increaseHardIndex,decreaseHardIndex,addLetter,resetHardIndex,resetHardWordArray,resetHardWords,removeLetter,addWordOne,addWordTwo,addWordThree,addWordFour,addWordFive,addWordsix,addRightWord} = hardTileSlice.actions;
export default hardTileSlice.reducer;