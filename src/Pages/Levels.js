import React from 'react'
import Layout from '../Components/Layout'
import classes from './Levels.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { ResetTargetWord, setFiveLetterTargetWord, setThreeLetterTargetWord,ShuffleWord } from '../Slice/targetWordSlice'
import { useDispatch, useSelector } from 'react-redux'
import targetWordSlice from '../Slice/targetWordSlice'
import { removeOneEasyTile, removeThreeEasyTile, removeThreeLetterWord, removeTwoEasyTile } from '../Slice/EasyTileSlices/tileSlice'
import { resetEasyIndex } from '../Slice/EasyTileSlices/indexEasyTileSlice'
import { removeLetterFive, removeLetterFour, removeLetterOne, removeLetterThree, removeLetterTwo } from '../Slice/MediumTileSlice/mediumTileSlice'
import { resetMediumIndex } from '../Slice/MediumTileSlice/indexMediumTileSlice'
import { ResetCategoryTarget, resetLevel, resetShuffledWord, setCategoryTarget } from '../Slice/CategoryTileSlice/categorySlice'
import { resetHardIndex, resetHardWordArray, resetHardWords } from '../Slice/HardTileSlice/hardTileSlice'
import { closeCategoryModal, closeShowModal } from '../Slice/modalSlice'

const Levels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    const handleEasyClick=()=>{
      dispatch(ResetTargetWord())
      dispatch(setThreeLetterTargetWord());
      dispatch(removeOneEasyTile())
      dispatch(removeTwoEasyTile());
      dispatch(removeThreeEasyTile());
      dispatch(removeThreeLetterWord());
      dispatch(resetEasyIndex());
      dispatch(closeShowModal());
      navigate('/easy-mode');
    }


    const handleMediumClick=()=>{
      dispatch(ResetTargetWord());
      dispatch(setFiveLetterTargetWord());
      dispatch(removeLetterFive())
      dispatch(removeLetterFour());
      dispatch(removeLetterThree());
      dispatch(removeLetterTwo())
      dispatch(removeLetterOne());
      dispatch(resetMediumIndex());
      dispatch(closeShowModal());
      navigate('/medium-mode')
    }

    const handleHardClick=()=>{
      dispatch(resetHardIndex());
      dispatch(resetHardWordArray());
      dispatch(resetHardWords())
      dispatch(ResetTargetWord());
      dispatch(setFiveLetterTargetWord());
      dispatch(closeShowModal());
      navigate('/hard-mode')

    }

    const handleAnimalCategory=()=>{
      // setCategoryTarget("animal");
      dispatch(resetLevel());
      dispatch(ResetCategoryTarget())
      dispatch(resetShuffledWord());
      dispatch(closeCategoryModal())
      navigate('/category/animal')
      
    }

    const handleSportCategory=()=>{
      // setCategoryTarget("sport");
      dispatch(resetLevel())
      dispatch(ResetCategoryTarget())
      dispatch(resetShuffledWord());
      navigate('/category/sport')
      
    }


    const handleHumanCategory=()=>{
      // setCategoryTarget("human body");
      dispatch(resetLevel());
      dispatch(ResetCategoryTarget())
      dispatch(resetShuffledWord());
      navigate('/category/humanbody')
      
    }


    const handleFoodCategory=()=>{
      // setCategoryTarget("food");
      dispatch(resetLevel());
      dispatch(ResetCategoryTarget())
      dispatch(resetShuffledWord());
      navigate('/category/food')
      
    }



  return (
    <div>
    <Layout>
      <div className={classes.container}>
      <div className={classes.level_buttons}> 
      <p>Levels</p>
      
      <button  type="button" onClick={handleEasyClick}>Easy</button>
      <button  type="button" onClick={handleMediumClick} >Medium</button>
      <button  type="button" onClick={handleHardClick} >Hard</button>
      </div>
      {/* <hr /> */}
      <p>Categories</p>
      <div className={classes.category_buttons}>
      
      <button  type="button" style={{width:"100%"}} onClick={handleAnimalCategory}>Animals</button>
      <button  type="button" style={{width:"100%"}} onClick={handleSportCategory}>Sports</button>
      <button  type="button" style={{width:"100%"}} onClick={handleHumanCategory}>Human Body</button>
      <button  type="button" style={{width:"100%"}} onClick={handleFoodCategory}>Food</button>
     
      </div>

      </div>
      <Footer active={2}/>
    </Layout>
    </div>
  )
}

export default Levels
