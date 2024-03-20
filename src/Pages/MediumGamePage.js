import React,{ useState,useEffect } from 'react'
import Layout from '../Components/Layout'
import classes from './MediumGamePage.module.css'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import indexMediumTileSlice, { decreaseMediumTileIndex, increaseMediumTileIndex, resetMediumIndex } from '../Slice/MediumTileSlice/indexMediumTileSlice';
import { addFiveLetterWord, addLetterFive, addLetterFour, addLetterOne, addLetterThree, addLetterTwo, removeFiveLetterWord, removeLetterFive, removeLetterFour, removeLetterOne, removeLetterThree, removeLetterTwo } from '../Slice/MediumTileSlice/mediumTileSlice';
import mediumTileSlice from '../Slice/MediumTileSlice/mediumTileSlice';
import { checkWord } from '../Slice/checkWordSlice';
import CryptoJS from "crypto-js";
// import { checkWord } from '../Slice/checkWordSlice';
import EnteredWordModal from '../Components/EnteredWordModal';
import checkWordSlice from '../Slice/checkWordSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import targetWordSlice, { ResetTargetWord, ShuffleWord, setFiveLetterTargetWord } from '../Slice/targetWordSlice';
import modalSlice, { closeShowModal, openShowModal } from '../Slice/modalSlice';
const secretKey = 'I am a Secret Key';

const MediumGamePage = () => {
  const [progress, setProgress] =useState(0);
  const dispatch = useDispatch();
  const {mediumTileIndex} = useSelector((state)=>state.indexMediumTileSlice);
  const {fiveLetterWordArray} = useSelector((state)=>state.mediumTileSlice);
  const {fiveLetterTargetWord,WordForGuess} = useSelector((state)=>state.targetWordSlice);
  const {showModal} = useSelector((state)=>state.modalSlice)
  // const [showModal,setShowModal] = useState(false);
  

  const decryptData =()=>{
    const decryptedData = CryptoJS.AES.decrypt(fiveLetterTargetWord,secretKey).toString(CryptoJS.enc.Utf8);
    console.log(decryptedData,"right")
    return decryptedData;
} 


useEffect(()=>{
  if(!WordForGuess){
    dispatch(ShuffleWord(fiveLetterTargetWord));
  }   
  decryptData(); 
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
    console.log("pressed",char);
    if(mediumTileIndex == 1){
      dispatch(addLetterOne(String(char).toUpperCase()));
      dispatch(increaseMediumTileIndex());
    }
    if(mediumTileIndex == 2){
      dispatch(addLetterTwo(String(char).toUpperCase()));
      dispatch(increaseMediumTileIndex());
    }
    if(mediumTileIndex == 3){
      dispatch(addLetterThree(String(char).toUpperCase()));
      dispatch(increaseMediumTileIndex());
    }
    if(mediumTileIndex == 4){
      dispatch(addLetterFour(String(char).toUpperCase()));
      dispatch(increaseMediumTileIndex());
    }
    if(mediumTileIndex == 5){
      dispatch(addLetterFive(String(char).toUpperCase()));
      dispatch(increaseMediumTileIndex());
    }

  }

  const deleteKey=()=>{
    if(mediumTileIndex == 2){
      dispatch(decreaseMediumTileIndex());
      dispatch(removeLetterOne());
    }
    if(mediumTileIndex == 3){
      dispatch(decreaseMediumTileIndex());
      dispatch(removeLetterTwo());
    }
    if(mediumTileIndex == 4){
      dispatch(decreaseMediumTileIndex());
      dispatch(removeLetterThree());
    }
    if(mediumTileIndex == 5){
      dispatch(decreaseMediumTileIndex());
      dispatch(removeLetterFour());
    }
    if(mediumTileIndex == 6){
      dispatch(decreaseMediumTileIndex());
      dispatch(removeLetterFive());
    }
  }

  const handleKeyDown=(event)=>{
    if(event.key === "Enter"){
      if(mediumTileIndex == 6){
          dispatch(addFiveLetterWord());
          dispatch(checkWord({word1:fiveLetterWordArray[0]+fiveLetterWordArray[1]+fiveLetterWordArray[2]+fiveLetterWordArray[3]+fiveLetterWordArray[4],word2:decryptData(fiveLetterTargetWord)}));
          if(fiveLetterWordArray[0]+fiveLetterWordArray[1]+fiveLetterWordArray[2]+fiveLetterWordArray[3]+fiveLetterWordArray[4] === decryptData(fiveLetterTargetWord).toUpperCase()){
            dispatch(openShowModal());
          }
          else{
            dispatch(resetMediumIndex());
            dispatch(removeLetterOne());
            dispatch(removeLetterTwo());
            dispatch(removeLetterThree());
            dispatch(removeLetterFour());
            dispatch(removeLetterFive());
            dispatch(removeFiveLetterWord());
            toast.error("Try Again");
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


  const handleCloseModal=()=>{
    
    dispatch(removeLetterOne())
    dispatch(removeLetterTwo());
    dispatch(removeLetterThree());
    dispatch(removeLetterFive());
    dispatch(removeLetterFour());
    dispatch(removeFiveLetterWord());
    dispatch(ResetTargetWord());
    dispatch(setFiveLetterTargetWord());
    
    dispatch(resetMediumIndex());
    dispatch(closeShowModal());
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
       
       <p>Guess the 5 letter word!!</p>
       <br />
       <p style={{letterSpacing:"1rem"}}>{WordForGuess}</p>
       <div className={classes.tiles_grid}>
          <div className={`${classes.tile}`}>{fiveLetterWordArray[0]}</div>
          <div className={`${classes.tile}`}>{fiveLetterWordArray[1]}</div>
          <div className={`${classes.tile}`}>{fiveLetterWordArray[2]}</div>
          <div className={`${classes.tile}`}>{fiveLetterWordArray[3]}</div>
          <div className={`${classes.tile}`}>{fiveLetterWordArray[4]}</div>
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

        <EnteredWordModal open={showModal} close={handleCloseModal}/>
        <ToastContainer/>

    </Layout>
  )
}

export default MediumGamePage
