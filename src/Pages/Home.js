import React from 'react'
import Layout from '../Components/Layout'
import classes from './Home.module.css'
import Lottie from 'lottie-react'
import intro from '../Animations/intro.json'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'

const Home = () => {
    const navigate = useNavigate()
    const handlePlayButton=()=>{
        navigate('/levels')
    }
  return (
    <Layout>
      <div className={classes.container}>
      <p>Guess The Word To Win...</p>
      <Lottie
        animationData={intro}
        className={classes.animation}
      />
      <button  type="button" className={classes.btn} onClick={handlePlayButton}>play</button>
      </div>
      <Footer active ={1}/>
    </Layout>
  )
}

export default Home
