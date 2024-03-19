import { createSlice } from "@reduxjs/toolkit";
import dictionaryCategories from "../../Database/categories";
import CryptoJS from "crypto-js";

const initialState = {level:1,categoryTarget:"",EnteredWord:[],shuffledWord:"",guessedRight:false}

const secretKey = 'I am a Secret Key';

const encryptData=(data)=>{
    const encryptedData = CryptoJS.AES.encrypt(data,secretKey).toString();
    console.log(encryptedData);
    return encryptedData;
}

const Shuffle=(TargetWord)=>{
    console.log(TargetWord)
    var word = TargetWord?.split('');
    for(let i=word?.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = word[i];
        word[i] = word[j];
        word[j] = temp;
    }
    var shuffledWord = word?.join('');
    return shuffledWord;
}

const decryptData =(data)=>{
    const decryptedData = CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}



const categorySlice = createSlice({
    name:"categorySlice",
    initialState:initialState,
    reducers:{
        increaseLevel:(state,actions)=>{
            state.level = state.level+1;
            return state;
        },
        resetLevel:(state,actions)=>{
            state.level = 1;
            return state;
        },
        setCategoryTarget:(state,action)=>{
           state.categoryTarget = encryptData(action.payload);
           return state;
        },
        ResetCategoryTarget:(state,action)=>{
            state.categoryTarget = "";
            return state;
         },
        addLetter:(state,action)=>{
            for(let i=0;i<state.EnteredWord.length;i++){
                if(state.EnteredWord[i] == ""){
                    state.EnteredWord[i] = action.payload;
                    break;
                }
            }
            
            return state;
        },
        removeLetter:(state,action)=>{
            for(let i=state.EnteredWord.length-1;i>=0;i--){
                if(state.EnteredWord[i] !== ""){
                    state.EnteredWord[i] = "";
                    break;
                }
            }
            return state;
        },
        
        ShuffleWord:(state,action)=>{
            if(state.categoryTarget){
                state.shuffledWord = Shuffle(decryptData(state.categoryTarget));
            }
            
            return state;
        },
        resetShuffledWord:(state,action)=>{
            state.shuffledWord = "";
            return state;
        },
        setEnteredWord:(state,action)=>{
            state.EnteredWord = Array(decryptData(state.categoryTarget).length).fill('');
            return state;
        },
        checkWordCategory:(state,action)=>{
            const targeted = decryptData(state.categoryTarget);
            let count=0;
            for(let i=0;i<state.EnteredWord.length;i++){
                if(state.EnteredWord[i] == targeted[i].toUpperCase()){
                    count += 1;
                }
            }
            if(count == state.EnteredWord.length){
                state.guessedRight = true;
            }
            return state;

        },
        resetGuessedWord:(state,action)=>{
            state.guessedRight = false;
            return state;
        }

    }

})

export const {increaseLevel,resetLevel,setCategoryTarget,addLetter,removeLetter,resetWord,ShuffleWord,resetShuffledWord,ResetCategoryTarget,setEnteredWord,checkWordCategory, resetGuessedWord} = categorySlice.actions;
export default categorySlice.reducer;