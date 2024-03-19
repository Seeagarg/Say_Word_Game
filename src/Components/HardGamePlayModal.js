import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from './EnteredWordModal.module.css'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';



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
    // textAlign:'center',
   
    p: 4,
  };




const HardGamePlayModal = ({open,close}) => {

    const handleCloseClick=()=>{
        close()
    }


  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
         <p style={{fontSize:"2rem",fontWeight:"800",textAlign:"center"}}>How To Play?</p>
            
          <p style={{fontSize:"1rem",fontWeight:"500",margin:"1rem",textAlign:"center"}}>Guess The Word in 6 Tries...</p>
          
          <ul >
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change which indicates , the colored letter is in the word that you need to guess.</li>
          </ul>
            <p style={{fontSize:"1.5rem",fontWeight:"800",margin:"1rem",textAlign:"center"}}>Examples</p>

<div style={{padding:"0.5rem"}}>

        <div style={{padding:"0.3rem 2rem "}}>
            <div style={{display:"flex",gap:"0.5em"}} >
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>T</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>R</div>
                <div style={{background:"#e2f3ff",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>I</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>E</div>
                <div style={{background:"#e2f3ff",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>D</div>
            </div>
            <p style={{fontSize:"1rem",fontWeight:"300"}}><strong>T R E </strong> <span style={{color:"#339bf0"}}>is in the word that you need to guess. </span></p>
        </div>





        <div style={{padding:"0.3rem 2rem "}}>
            <div style={{display:"flex",gap:"0.5em"}} >
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>R</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>E</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>A</div>
                <div style={{background:"#e2f3ff",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>D</div>
                <div style={{background:"#e2f3ff",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>Y</div>
            </div>
            <p style={{fontSize:"1rem",fontWeight:"300"}}><strong>R E A </strong> <span style={{color:"#339bf0"}}> is in the word that you need to guess.</span></p>
        </div>

        <div style={{padding:"0.2rem 2rem "}}>
            <div style={{display:"flex",gap:"0.5em"}} >
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>T</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>R</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>E</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>A</div>
                <div style={{background:"rgb(51, 154, 240)",padding:"0.2rem 0.5rem",borderRadius:"5px"}}>T</div>
            </div>
            <p style={{fontSize:"1rem",fontWeight:"300"}}><strong>Congratulations! </strong> <span style={{color:"#339bf0"}}> You guessed right</span></p>
        </div>
            
        </div>   
         
          <div  style={{justifyContent:"center",display:"flex",padding:"1rem"}}>
          <div className={classes.btn} style={{width:"50%"}}>
          
          <button style={{background:"#202f3f"}} onClick={handleCloseClick}>Close</button>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default HardGamePlayModal
