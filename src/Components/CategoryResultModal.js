import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from './EnteredWordModal.module.css'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CryptoJS from "crypto-js";
import { Link, useNavigate } from 'react-router-dom';
import categorySlice, { increaseLevel, resetGuessedWord } from '../Slice/CategoryTileSlice/categorySlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  borderRadius:"20px",
  boxShadow: 24,
  textAlign:'center',
 
  p: 4,
};

const secretKey = 'I am a Secret Key';

const CategoryResultModal = ({open,close}) => {

    const [showAnswer,setShowAnswer] = useState(false)

    const {categoryTarget,guessedRight,level} = useSelector((state)=>state.categorySlice);
    

  const decryptData =(data)=>{
    const decryptedData = CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData)
    return decryptedData;
}

const dispatch = useDispatch();
const navigate = useNavigate()

const handleNextLevelClick=()=>{
  dispatch(resetGuessedWord())
    dispatch(increaseLevel())
  close();
}

const handlePlayAgainClick=()=>{
    close();
}

const handleGoBackClick=()=>{
  // close();
  
  // dispatch(ResetTargetWord());
  // dispatch(setThreeLetterTargetWord());
  // dispatch(removeOneEasyTile())
  // dispatch(removeTwoEasyTile());
  // dispatch(removeThreeEasyTile());
  // dispatch(removeThreeLetterWord());
  // dispatch(resetEasyIndex());
  // dispatch(resetStateRightWord());
  navigate('/home')
  // window.location.reload();
  
}


  // console.log(decryptData(fiveLetterTargetWord),"word")

  return (
    <div>
      <Modal
        open={open}
        // onClose={close}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {guessedRight?
        <img src="/assets/happy.png" alt="" className={classes.img} />:
        <img src="/assets/game_over.png" alt="" className={classes.img} />
        }
         <p style={{fontSize:"2rem",fontWeight:"800"}}>{guessedRight?"Congrats...":"OOPS..."}</p>
            
          <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>{guessedRight?"You guessed Right!!":"You guessed wrong!!"}</p>
          {guessedRight&&
            <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>The Word was <strong> {decryptData(categoryTarget)}</strong></p>
          }
            {showAnswer && 
            <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>The Word was <strong> {decryptData(categoryTarget)}</strong></p>
        }

        {level == 10 && guessedRight &&
        <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>Great!, You have completed this category...</p>
        }


        {level < 10 && 
        <>
          <div className={classes.buttons}>
          <div className={classes.btn}>
          
          {guessedRight?<button style={{background:"#e69a00"}} onClick={handleNextLevelClick}>Next Level</button>:
          <button style={{background:"#e69a00"}} onClick={handlePlayAgainClick}>Play Again</button>
          }
          </div>
          <div className={classes.btn}>
          <button style={{background:"#202f3f"}} onClick={handleGoBackClick}>Go Back</button>
          </div>
          </div>
          {!guessedRight &&
          <div className={classes.btn} style={{marginTop:"1rem"}}>
          <button style={{background:"#202f3f"}} onClick={()=>{setShowAnswer(!showAnswer)}}> {showAnswer?'Hide Answer':'Show Answer'}</button>
          </div>
          }
          </>
        }

        {
            level == 10 && guessedRight && 
            <div className={classes.btn} style={{marginTop:"1rem"}}>
          <button style={{background:"#202f3f"}} onClick={handleGoBackClick}> Go Back</button>
          </div>
        }





        </Box>
      </Modal>
    </div>
  )
}

export default CategoryResultModal
