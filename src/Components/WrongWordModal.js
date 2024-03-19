import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from './EnteredWordModal.module.css'
import { Box } from '@mui/material';

const WrongWordModal = ({open,close}) => {

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
        
        <img src="/assets/oops.png" alt="" className={classes.img} />:
            
          <p style={{fontSize:"1.5rem",fontWeight:"600",margin:"1rem"}}>The Entered Word is not in word dictionary!</p>
          
            
          <div  style={{justifyContent:"center",display:"flex",padding:"1rem"}}>
          <div className={classes.btn} style={{width:"50%"}}>
          
          <button style={{background:"#202f3f"}} onClick={close}>Close</button>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default WrongWordModal
