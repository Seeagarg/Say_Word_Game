import classes from './CategoryGame.module.css'
import React,{useEffect, useState} from 'react'
import Layout from '../Components/Layout'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import categorySlice, { ResetCategoryTarget, addLetter, checkWordCategory, increaseLevel, removeLetter, resetGuessedWord, resetShuffledWord, setCategoryTarget, setEnteredWord } from '../Slice/CategoryTileSlice/categorySlice';
import dictionaryCategories from '../Database/categories';
import CryptoJS from 'crypto-js';
import { ShuffleWord } from '../Slice/CategoryTileSlice/categorySlice';
import CategoryResultModal from '../Components/CategoryResultModal';
import { openCategoryModal,closeCategoryModal } from '../Slice/modalSlice';
import modalSlice from '../Slice/modalSlice';


const secretKey = 'I am a Secret Key';
const CategoryGame = () => {

    const dispatch = useDispatch();

    const [progress,setProgress] = useState()
    const {level} = useSelector((state)=>state.categorySlice)
    const category = useParams().category;
    // const [showModal,setShowModal] = useState(false);
    const {categoryTarget,shuffledWord,EnteredWord} = useSelector((state)=>state.categorySlice);
    const {showCategoryModal} = useSelector((state)=>state.modalSlice)

    const decryptData =(data)=>{
      const decryptedData = CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8);
      return decryptedData;
  }


    useEffect(()=>{
        if(shuffledWord == ""){
            dispatch(ShuffleWord());
            dispatch(setEnteredWord());
        }
       
        
    },[categoryTarget])


    useEffect(()=>{
        if(!categoryTarget){
            if(category == "animal"){
                const data = dictionaryCategories.find((item)=>item.category === "animal");
                dispatch(setCategoryTarget(data.name[level-1]))
            }
            else if(category == "sport"){
                const data = dictionaryCategories.find((item)=>item.category === "sport");
                dispatch(setCategoryTarget(data.name[level-1]))
            }
            else if(category == "humanbody"){
                const data = dictionaryCategories.find((item)=>item.category === "human body");
                dispatch(setCategoryTarget(data.name[level-1]))
            }
            else if(category == "food"){
                const data = dictionaryCategories.find((item)=>item.category === "food");
                dispatch(setCategoryTarget(data.name[level-1]))
            }
        }
    },[])

    const pressKey=(char)=>{
        dispatch(addLetter(char.toUpperCase()));
    }

    const handleKeyDown=(event)=>{
        if(event.key === "Enter"){
          let size = 0;
          for(let i=0;i<EnteredWord.length;i++){
            if(EnteredWord[i] !== ""){
              size++;
            }
          }

           if(size === decryptData(categoryTarget).length){
            dispatch(checkWordCategory());
            dispatch(openCategoryModal());
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

    const deleteKey=()=>{
      dispatch(removeLetter());
    }


    useEffect(()=>{
        document.addEventListener("keydown",handleKeyDown)

        return()=>{
            document.removeEventListener("keydown",handleKeyDown)
        }
      },[handleKeyDown])



      const handleClose=()=>{
        // dispatch(increaseLevel());
        dispatch(resetGuessedWord());
        dispatch(resetShuffledWord());
        dispatch(ResetCategoryTarget());
        
        window.location.reload();
        dispatch(closeCategoryModal());

      }
     
      

  return (
    <div>
      <Layout>
    {/* <div className={classes.top_container}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
    </div> */}
       <div className={classes.container}>
       <p>Guess the {category}</p>
       <br />
       <p>Level : {level}</p>
       <br />
       <p style={{letterSpacing:"1rem"}}>{shuffledWord}</p>
       <div className={classes.tiles_grid}>
       {EnteredWord.map((item)=>(
            <div className={`${classes.tile}`}>{item}</div>
       ))}
          {/* <div className={`${classes.tile}`}></div>
          <div className={`${classes.tile}`}></div> */}
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
       <CategoryResultModal open={showCategoryModal} close={handleClose}/>
    </Layout>
    </div>
  )
}

export default CategoryGame
