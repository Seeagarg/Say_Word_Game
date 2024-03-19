import { createSlice } from "@reduxjs/toolkit";
import letter3DictionaryArray from "../Database/Letter3Dictionary";
import targetWords from "../Database/TargetWords";
import CryptoJS from "crypto-js";
const secretKey = 'I am a Secret Key';

const initialState={threeLetterTargetWord:"",WordForGuess:"",fiveLetterTargetWord:""}

const encryptData=(data)=>{
    const encryptedData = CryptoJS.AES.encrypt(data,secretKey).toString();
    return encryptedData;
}

const decryptData =(data)=>{
    const decryptedData = CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

const targetWordSlice = createSlice({
    name:'targetWordSlice',
    initialState:initialState,
    reducers:{
        setThreeLetterTargetWord:(state,action)=>{
            state.threeLetterTargetWord  = encryptData(letter3DictionaryArray[Math.floor(Math.random() * letter3DictionaryArray.length)])
            console.log(state.threeLetterTargetWord)
            return state;
        },
        setFiveLetterTargetWord:(state,action)=>{
            state.fiveLetterTargetWord  = encryptData(targetWords[Math.floor(Math.random() * targetWords.length)])
            console.log(state.fiveLetterTargetWord)
            return state;
        },
        ShuffleWord:(state,action)=>{
            const TargetWord = decryptData(action.payload);
            if(TargetWord !== ""){
     
      var word = TargetWord?.split('');
      if(TargetWord.length === 3){

      
      var alphabet = 'abcdefghijklmnopqrstuvwxyz';

            for (let k = 0; k < 2; k++) {
                var randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                word.push(randomLetter);
            }

        }
            
            for(let i=word?.length-1;i>0;i--){
                let j = Math.floor(Math.random()*(i+1));
                let temp = word[i];
                word[i] = word[j];
                word[j] = temp;
            }
            var shuffledWord = word?.join('');
            state.WordForGuess = shuffledWord;
        }
            return state;
        },
        ResetTargetWord:(state,action)=>{
            state.WordForGuess="";
            state.threeLetterTargetWord="";
            state.fiveLetterTargetWord=""
            return state;
        },
        
    }
})

export const {setThreeLetterTargetWord,ShuffleWord,ResetTargetWord,setFiveLetterTargetWord} = targetWordSlice.actions
export default targetWordSlice.reducer;