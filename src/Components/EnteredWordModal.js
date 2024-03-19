import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from './EnteredWordModal.module.css'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import checkWordSlice, { resetStateRightWord } from '../Slice/checkWordSlice';
import CryptoJS from "crypto-js";
import targetWordSlice, { ResetTargetWord, setThreeLetterTargetWord } from '../Slice/targetWordSlice';
import { removeOneEasyTile, removeThreeEasyTile, removeThreeLetterWord, removeTwoEasyTile } from '../Slice/EasyTileSlices/tileSlice';
import { resetEasyIndex } from '../Slice/EasyTileSlices/indexEasyTileSlice';
import { Link, useNavigate } from 'react-router-dom';

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

const EnteredWordModal = ({open,close}) => {

  const {threeLetterTargetWord,fiveLetterTargetWord} = useSelector((state)=>state.targetWordSlice)

  const decryptData =(data)=>{
    const decryptedData = CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData)
    return decryptedData;
}

const dispatch = useDispatch();
const navigate = useNavigate()

const handlePlayAgainClick=()=>{
  dispatch(resetStateRightWord());
  close();
  // navigate('/easy-mode')

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

  const {rightWord} = useSelector((state)=>state.checkWordSlice)
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
        {rightWord?
        <img src="/assets/happy.png" alt="" className={classes.img} />:
        <img src="/assets/game_over.png" alt="" className={classes.img} />
        }
         <p style={{fontSize:"2rem",fontWeight:"800"}}>{rightWord?"Congrats...":"OOPS..."}</p>
            
          <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>{rightWord?"You guessed Right!!":"You guessed wrong!!"}</p>
          
            <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>The Word was "<strong> {threeLetterTargetWord ? decryptData(threeLetterTargetWord) : decryptData(fiveLetterTargetWord)}</strong>"</p>
         
          <div className={classes.buttons}>
          <div className={classes.btn}>
          
          <button style={{background:"#e69a00"}} onClick={handlePlayAgainClick}>Play Again</button>
          </div>
          <div className={classes.btn}>
          <button style={{background:"#202f3f"}} onClick={handleGoBackClick}>Go Back</button>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EnteredWordModal
