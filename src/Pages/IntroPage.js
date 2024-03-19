import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Components/Layout';
import classes from './IntroPage.module.css'
import Lottie from 'lottie-react';
import intro from '../Animations/intro.json'

const IntroPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/home')
        },1000)
    })
  return (
    <Layout>
      <div className={classes.container}>
      <Lottie
        animationData={intro}
        className={classes.animation}
      />
      {/* <button>Play</button> */}
      </div>
    </Layout>
  )
}

export default IntroPage
