import React, { useState, useEffect } from "react";
import classes from "./HardGamePage.module.css";
import Layout from "../Components/Layout";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import HardGamePlayModal from "../Components/HardGamePlayModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addLetter,
  addWordOne,
  addWordTwo,
  addWordThree,
  addWordFour,
  addWordFive,
  addWordsix,
  decreaseHardIndex,
  increaseHardIndex,
  removeLetter,
  addRightWord,
  resetHardIndex,
  resetHardWordArray,
  resetHardWords,
} from "../Slice/HardTileSlice/hardTileSlice";
import hardTileSlice from "../Slice/HardTileSlice/hardTileSlice";
import {
  ResetTargetWord,
  ShuffleWord,
  setFiveLetterTargetWord,
} from "../Slice/targetWordSlice";
import CryptoJS from "crypto-js";
import EnteredWordModal from "../Components/EnteredWordModal";
import { checkWord, resetStateRightWord } from "../Slice/checkWordSlice";
import modalSlice, { closeInstructionModal, closeShowModal, openInstructionModal, openShowModal } from "../Slice/modalSlice";
import { FortTwoTone } from "@mui/icons-material";
import targetWords from "../Database/TargetWords";
import WrongWordModal from "../Components/WrongWordModal";
const secretKey = "I am a Secret Key";

const HardGamePage = () => {
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(100);
  // const [instructionModal, setInstructionModal] = useState(true);
  const [showWrongWordModal,setShowWrongWordModal] = useState(false);
  
  const { hardWordArray, hardIndex, hardFiveLetterWords, correctWord } =
    useSelector((state) => state.hardTileSlice);
  const { fiveLetterTargetWord, WordForGuess } = useSelector(
    (state) => state.targetWordSlice
  );
  const { showModal,instructionModal } = useSelector((state) => state.modalSlice);
 

  const decryptData = () => {
    const decryptedData = CryptoJS.AES.decrypt(
      fiveLetterTargetWord,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    console.log(decryptedData, "right");
    return decryptedData;
  };

  useEffect(() => {
    if (fiveLetterTargetWord == "") {
      // dispatch(setFiveLetterTargetWord());
    }
  }, []);

  useEffect(() => {
    if (fiveLetterTargetWord !== "") {
      dispatch(addRightWord(decryptData(fiveLetterTargetWord).toUpperCase()));
      // dispatch(ShuffleWord(fiveLetterTargetWord));
    }
  }, [fiveLetterTargetWord]);

  useEffect(() => {
    if(!instructionModal){
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
    return () => clearInterval(intervalId) // Cleanup function
  }
  
   
  },[instructionModal]);

 
  

  const pressKey = (char) => {
    // console.log(hardFiveLetterWords.word1,"five")
    if (hardIndex == 6 && hardFiveLetterWords.word1 === "") {
      return;
    }
    if (hardIndex == 11 && hardFiveLetterWords.word2 === "") {
      return;
    }
    if (hardIndex == 16 && hardFiveLetterWords.word3 === "") {
      return;
    }
    if (hardIndex == 21 && hardFiveLetterWords.word4 === "") {
      return;
    }
    if (hardIndex == 26 && hardFiveLetterWords.word5 === "") {
      return;
    }
    if (hardIndex == 31 && hardFiveLetterWords.word6 === "") {
      return;
    }
    dispatch(addLetter(char.toUpperCase()));
    dispatch(increaseHardIndex());
  };

  const deleteKey = () => {
    if (hardIndex == 1) {
      return;
    }
    if(hardFiveLetterWords.word1 && hardIndex <= 6){
      return;
    }
    if(hardFiveLetterWords.word2 && hardIndex <= 11){
      return;
    }
    if(hardFiveLetterWords.word3 && hardIndex <= 16){
      return;
    }
    if(hardFiveLetterWords.word4 && hardIndex <= 21){
      return;
    }
    if(hardFiveLetterWords.word5 && hardIndex <= 26){
      return;
    }
    if(hardFiveLetterWords.word6 && hardIndex <= 31){
      return;
    }
    dispatch(removeLetter());
    dispatch(decreaseHardIndex());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
     
      if (hardIndex == 6) {
        if(targetWords.includes((hardWordArray[0] +
          hardWordArray[1] +
          hardWordArray[2] +
          hardWordArray[3] +
          hardWordArray[4]).toLowerCase())){
            
            dispatch(
              addWordOne(
                hardWordArray[0] +
                  hardWordArray[1] +
                  hardWordArray[2] +
                  hardWordArray[3] +
                  hardWordArray[4]
              )
            );
            dispatch(
              checkWord({
                word1:
                  hardWordArray[0] +
                  hardWordArray[1] +
                  hardWordArray[2] +
                  hardWordArray[3] +
                  hardWordArray[4],
                word2: correctWord,
              })
            );
            
          }
          else{
            setShowWrongWordModal(true);
          }

        if (
          hardWordArray[0] +
            hardWordArray[1] +
            hardWordArray[2] +
            hardWordArray[3] +
            hardWordArray[4] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
      } 
      else if (hardIndex == 11) {
        if(targetWords.includes( (hardWordArray[5] +
          hardWordArray[6] +
          hardWordArray[7] +
          hardWordArray[8] +
          hardWordArray[9]).toLowerCase())){         
        dispatch(
          addWordTwo(
            hardWordArray[5] +
              hardWordArray[6] +
              hardWordArray[7] +
              hardWordArray[8] +
              hardWordArray[9]
          )
        );
        dispatch(
          checkWord({
            word1:
              hardWordArray[5] +
              hardWordArray[6] +
              hardWordArray[7] +
              hardWordArray[8] +
              hardWordArray[9],
            word2: correctWord,
          })
        );
          }
          else{
            setShowWrongWordModal(true);
          }
        if (
          hardWordArray[5] +
            hardWordArray[6] +
            hardWordArray[7] +
            hardWordArray[8] +
            hardWordArray[9] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
      } 
      
      else if (hardIndex == 16) {

        if(targetWords.includes((hardWordArray[10] +
          hardWordArray[11] +
          hardWordArray[12] +
          hardWordArray[13] +
          hardWordArray[14]).toLowerCase())){
        dispatch(
          addWordThree(
            hardWordArray[10] +
              hardWordArray[11] +
              hardWordArray[12] +
              hardWordArray[13] +
              hardWordArray[14]
          )
        );
        dispatch(
          checkWord({
            word1:
              hardWordArray[10] +
              hardWordArray[11] +
              hardWordArray[12] +
              hardWordArray[13] +
              hardWordArray[14],
            word2: correctWord,
          })
        );
        }
        else{
          setShowWrongWordModal(true);
        }
        if (
          hardWordArray[10] +
            hardWordArray[11] +
            hardWordArray[12] +
            hardWordArray[13] +
            hardWordArray[14] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
      } 
      else if (hardIndex == 21) {
        if(targetWords.includes( (hardWordArray[15] +
          hardWordArray[16] +
          hardWordArray[17] +
          hardWordArray[18] +
          hardWordArray[19]).toLowerCase())){
        dispatch(
          addWordFour(
            hardWordArray[15] +
              hardWordArray[16] +
              hardWordArray[17] +
              hardWordArray[18] +
              hardWordArray[19]
          )
        );
        dispatch(
          checkWord({
            word1:
              hardWordArray[15] +
              hardWordArray[16] +
              hardWordArray[17] +
              hardWordArray[18] +
              hardWordArray[19],
            word2: correctWord,
          })
        );
          }
           else{
            setShowWrongWordModal(true);
          }
        if (
          hardWordArray[15] +
            hardWordArray[16] +
            hardWordArray[17] +
            hardWordArray[18] +
            hardWordArray[19] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
      }
       else if (hardIndex == 26) {
        if(targetWords.includes((hardWordArray[20] +
          hardWordArray[21] +
          hardWordArray[22] +
          hardWordArray[23] +
          hardWordArray[24]).toLowerCase())){

          
        dispatch(
          addWordFive(
            hardWordArray[20] +
              hardWordArray[21] +
              hardWordArray[22] +
              hardWordArray[23] +
              hardWordArray[24]
          )
        );
        dispatch(
          checkWord({
            word1:
              hardWordArray[20] +
              hardWordArray[21] +
              hardWordArray[22] +
              hardWordArray[23] +
              hardWordArray[24],
            word2: correctWord,
          })
        );
          }
          else{
            setShowWrongWordModal(true);
          }
        if (
          hardWordArray[20] +
            hardWordArray[21] +
            hardWordArray[22] +
            hardWordArray[23] +
            hardWordArray[24] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
      } else if (hardIndex == 31) {

        if(targetWords.includes(( hardWordArray[25] +
          hardWordArray[26] +
          hardWordArray[27] +
          hardWordArray[28] +
          hardWordArray[29]).toLowerCase())){
        dispatch(
          addWordsix(
            hardWordArray[25] +
              hardWordArray[26] +
              hardWordArray[27] +
              hardWordArray[28] +
              hardWordArray[29]
          )
        );
        dispatch(
          checkWord({
            word1:
              hardWordArray[25] +
              hardWordArray[26] +
              hardWordArray[27] +
              hardWordArray[28] +
              hardWordArray[29],
            word2: correctWord,
          })
        );
          }
          else{
            setShowWrongWordModal(true);
          }
        if (
          hardWordArray[25] +
            hardWordArray[26] +
            hardWordArray[27] +
            hardWordArray[28] +
            hardWordArray[29] ==
          correctWord
        ) {
          dispatch(openShowModal());
        }
        else{
          dispatch(openShowModal())
        }
      }
    }
    if (event.key == "Backspace" || event.key === "Delete") {
      deleteKey();
      return;
    }
    if (event.key.match(/^[a-z]$/)) {
      pressKey(event.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCloseInstructionModal = () => {
    dispatch(closeInstructionModal())
  };

  const handleCloseResultModal = () => {
   
    dispatch(resetHardIndex());
    dispatch(resetHardWordArray());
    dispatch(resetHardWords());
    dispatch(ResetTargetWord());
    dispatch(setFiveLetterTargetWord());
    dispatch(resetStateRightWord());
    dispatch(openInstructionModal())
    dispatch(closeShowModal());
  };

  const findCorrectLetter = () => {
    let arr = [];
    for (let i = 0; i < correctWord.length; i++) {
      arr.push(correctWord[i]);
    }

    return arr;
  };

  // console.log(hardFiveLetterWords.word1[1],"--")

  return (
    <Layout>
      <div className={classes.top_container}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </div>
      <div className={classes.container}>
        <p>Guess the 5 letter word!!</p>
        <br />
        <div className={classes.tiles_grid}>
          {hardWordArray.map((letter, index) => (
            <div
              className={`${classes.tile} ${
                correctWord.search(hardFiveLetterWords.word1[index]) !== -1 &&
                hardFiveLetterWords.word1[index] &&
                classes.change_color
              }  ${
                correctWord.search(hardFiveLetterWords.word2[index - 5]) !==
                  -1 &&
                hardFiveLetterWords.word2[index - 5] &&
                classes.change_color
              }  ${
                correctWord.search(hardFiveLetterWords.word3[index - 10]) !==
                  -1 &&
                hardFiveLetterWords.word3[index - 10] &&
                classes.change_color
              }
              ${
                correctWord.search(hardFiveLetterWords.word4[index - 15]) !==
                  -1 &&
                hardFiveLetterWords.word4[index - 15] &&
                classes.change_color
              }

              ${
                correctWord.search(hardFiveLetterWords.word5[index - 20]) !==
                  -1 &&
                hardFiveLetterWords.word5[index - 20] &&
                classes.change_color
              }
              ${
                correctWord.search(hardFiveLetterWords.word6[index - 25]) !==
                  -1 &&
                hardFiveLetterWords.word6[index - 25] &&
                classes.change_color
              }
              ${
                hardFiveLetterWords.word1[index] &&
                classes.flip_tile
              }
              ${
                hardFiveLetterWords.word2[index-5] &&
                classes.flip_tile
              }
              ${
                hardFiveLetterWords.word3[index-10] &&
                classes.flip_tile
              }
              ${
                hardFiveLetterWords.word4[index-15] &&
                classes.flip_tile
              }
              ${
                hardFiveLetterWords.word5[index-20] &&
                classes.flip_tile
              }
              ${
                hardFiveLetterWords.word6[index-25] &&
                classes.flip_tile
              }
              `}
            >
              {letter}
            </div>
          ))}
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
          <div
            className={classes.key_large}
            onClick={() => handleKeyDown({ key: "Enter" })}
          >
            ENTER
          </div>
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
      <HardGamePlayModal
        open={instructionModal}
        close={handleCloseInstructionModal}
      />
      <EnteredWordModal open={showModal} close={handleCloseResultModal} />
      <WrongWordModal open = {showWrongWordModal} close={()=>{setShowWrongWordModal(false)}}/>
    </Layout>
  );
};

export default HardGamePage;
