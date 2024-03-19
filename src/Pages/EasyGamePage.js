import React,{useEffect, useState} from 'react'
import Layout from '../Components/Layout'
import classes from './EasyGamePage.module.css'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import indexEasyTileSlice, { decreaseIndex, increaseIndex, resetEasyIndex } from '../Slice/EasyTileSlices/indexEasyTileSlice';
import { addOneEasyTile, addThreeEasyTile, addThreeLetterWord, addTwoEasyTile, removeOneEasyTile, removeThreeEasyTile, removeThreeLetterWord, removeTwoEasyTile } from '../Slice/EasyTileSlices/tileSlice';
import tileSlice from '../Slice/EasyTileSlices/tileSlice';
import { ResetTargetWord, ShuffleWord, setThreeLetterTargetWord } from '../Slice/targetWordSlice';
import targetWordSlice from '../Slice/targetWordSlice';

import CryptoJS from "crypto-js";
import { checkWord } from '../Slice/checkWordSlice';
import EnteredWordModal from '../Components/EnteredWordModal';
import checkWordSlice from '../Slice/checkWordSlice';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { closeShowModal, openShowModal } from '../Slice/modalSlice';
import modalSlice from '../Slice/modalSlice';

const secretKey = 'I am a Secret Key';
const EasyGamePage = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(99);
    // const [showModal,setShowModal] = useState(false);
    const {easyTileIndex} = useSelector((state)=>state.indexEasyTileSlice)
    const {oneEasyTile,twoEasyTile,threeEasyTile,ThreeLetterWord} = useSelector((state)=>state.tileSlice)
    const {threeLetterTargetWord,WordForGuess} = useSelector((state)=>state.targetWordSlice)
    const {rightWord} = useSelector((state)=>state.checkWordSlice)
    const {showModal} = useSelector((state)=>state.modalSlice)

    const decryptData =()=>{
      const decryptedData = CryptoJS.AES.decrypt(threeLetterTargetWord,secretKey).toString(CryptoJS.enc.Utf8);
      console.log(decryptedData,"right")
      return decryptedData;
  }

    useEffect(()=>{
      if(!WordForGuess){
        dispatch(ShuffleWord(threeLetterTargetWord));
      }    
    },[])



    useEffect(() => {

      const endTime = Date.now() + 30000; // Get the end time (30 seconds from now)
  
      const intervalId = setInterval(() => {
        const currentTime = Date.now(); // Get the current time
        const elapsedTime = endTime - currentTime; // Calculate the remaining time
        const remainingProgress = Math.max((elapsedTime / 30000) * 100, 0); // Calculate the remaining progress
  
        setProgress(remainingProgress); // Update progress
  
        // Store progress data in localStorage
        localStorage.setItem('progressData', JSON.stringify({
          time: (30000 - elapsedTime) / 1000, // Time in seconds (increasing from 0 to 30)
          timeForProgress: 30, // Total time for progress (30 seconds)
          progress: remainingProgress // Progress value
        }));
  
        if (remainingProgress === 0) {
          clearInterval(intervalId); // Stop the interval when progress reaches 0
          console.log("Progress completed");
          dispatch(openShowModal());
        }
      }, 1000); // Update progress every second
  
      return () => clearInterval(intervalId); // Cleanup function
    }, []);



      const pressKey=(char)=>{
        console.log("pressed",char)
        if(easyTileIndex == 1){
            dispatch(addOneEasyTile(String(char).toUpperCase()));
            dispatch(increaseIndex());
        }
        else if(easyTileIndex == 2){
            dispatch(addTwoEasyTile(String(char).toUpperCase()));
            dispatch(increaseIndex());
        }
        else if(easyTileIndex == 3){
            dispatch(addThreeEasyTile(String(char).toUpperCase()))
            dispatch(increaseIndex());
        }
      }

      const handleKeyDown=(event)=>{
        if(event.key === "Enter"){
          
            if(easyTileIndex == 4){
                dispatch(addThreeLetterWord());
                  dispatch(checkWord({word1:oneEasyTile+twoEasyTile+threeEasyTile,word2:decryptData(threeLetterTargetWord)}))
                  console.log(rightWord);
                  if(oneEasyTile+twoEasyTile+threeEasyTile === decryptData(threeLetterTargetWord).toUpperCase()){
                      dispatch(openShowModal());
                  }
                  else{
                    dispatch(resetEasyIndex());
                    dispatch(removeOneEasyTile());
                    dispatch(removeTwoEasyTile());
                    dispatch(removeThreeEasyTile());
                    dispatch(removeThreeLetterWord());
                     toast.error("Try Again")
                  }
            }
            
        }
        if(event.key == "Backspace" || event.key === "Delete"){
            deleteKey();
            return;
        }
        if(event.key.match(/^[a-z]$/)){
            pressKey(event.key)
        }  
      }

      useEffect(()=>{
        
        document.addEventListener("keydown",handleKeyDown)

        return()=>{
            document.removeEventListener("keydown",handleKeyDown)
        }
           
      },[handleKeyDown])

      const deleteKey=()=>{
        console.log('deleted',easyTileIndex);
        if(easyTileIndex == 2){
            dispatch(decreaseIndex());
            dispatch(removeOneEasyTile());
        }
        if(easyTileIndex == 3){
            dispatch(decreaseIndex());
            dispatch(removeTwoEasyTile());
        }
        if(easyTileIndex == 4){
            dispatch(decreaseIndex());
            dispatch(removeThreeEasyTile());
        }
      }

      const handleCloseModal=()=>{
        dispatch(closeShowModal());
        dispatch(ResetTargetWord());
        dispatch(setThreeLetterTargetWord());
        dispatch(removeOneEasyTile())
        dispatch(removeTwoEasyTile());
        dispatch(removeThreeEasyTile());
        dispatch(removeThreeLetterWord());
        dispatch(resetEasyIndex());
        window.location.reload();
      }
  return (
    <Layout>
    <div className={classes.top_container}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
    </div>
       <div className={classes.container}>
       
       <p>Guess the 3 letter word!!</p>
       <br />
       <p style={{letterSpacing:"1rem"}}>{WordForGuess}</p>
       <div className={classes.tiles_grid}>
          <div className={`${classes.tile}`}>{oneEasyTile}</div>
          <div className={`${classes.tile}`}>{twoEasyTile}</div>
          <div className={`${classes.tile}`}>{threeEasyTile}</div>
        </div>
       </div>
       <div className={classes.keyboard_container}>
          <div className={classes.keypad_1}>
            <div className={classes.key} onClick={() => pressKey("Q")}>
              Q
            </div>
            <div className={classes.key} onClick={() => pressKey("W")}>
              W
            </div>
            <div className={classes.key} onClick={() => pressKey("E")}>
              E
            </div>
            <div className={classes.key} onClick={() => pressKey("R")}>
              R
            </div>
            <div className={classes.key} onClick={() => pressKey("T")}>
              T
            </div>
            <div className={classes.key} onClick={() => pressKey("Y")}>
              Y
            </div>
            <div className={classes.key} onClick={() => pressKey("U")}>
              U
            </div>
            <div className={classes.key} onClick={() => pressKey("I")}>
              I
            </div>
            <div className={classes.key} onClick={() => pressKey("O")}>
              O
            </div>
            <div className={classes.key} onClick={() => pressKey("P")}>
              P
            </div>
          </div>
          <div className={classes.keypad_2}>
            <div className={classes.key} onClick={() => pressKey("A")}>
              A
            </div>
            <div className={classes.key} onClick={() => pressKey("S")}>
              S
            </div>
            <div className={classes.key} onClick={() => pressKey("D")}>
              D
            </div>
            <div className={classes.key} onClick={() => pressKey("F")}>
              F
            </div>
            <div className={classes.key} onClick={() => pressKey("G")}>
              G
            </div>
            <div className={classes.key} onClick={() => pressKey("H")}>
              H
            </div>
            <div className={classes.key} onClick={() => pressKey("J")}>
              J
            </div>
            <div className={classes.key} onClick={() => pressKey("K")}>
              K
            </div>
            <div className={classes.key} onClick={() => pressKey("L")}>
              L
            </div>
          </div>
          <div className={classes.keypad_3}>
            <div className={classes.key_large} onClick={()=>handleKeyDown({key:"Enter"})}>ENTER</div>
            <div className={classes.key} onClick={() => pressKey("Z")}>
              Z
            </div>
            <div className={classes.key} onClick={() => pressKey("X")}>
              X
            </div>
            <div className={classes.key} onClick={() => pressKey("C")}>
              C
            </div>
            <div className={classes.key} onClick={() => pressKey("V")}>
              V
            </div>
            <div className={classes.key} onClick={() => pressKey("B")}>
              B
            </div>
            <div className={classes.key} onClick={() => pressKey("N")}>
              N
            </div>
            <div className={classes.key} onClick={() => pressKey("M")}>
              M
            </div>
            <div className={classes.key_large} onClick={deleteKey}>
              Backspace
            </div>
          </div>
        </div>
        <ToastContainer/>
        <EnteredWordModal open={showModal} close={handleCloseModal}/>
    </Layout>
  )
}

export default EasyGamePage
