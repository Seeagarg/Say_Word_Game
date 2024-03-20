import React from 'react'
import Layout from '../Components/Layout'
import classes from './DescriptionPage.module.css'
import Footer from '../Components/Footer'

const DescriptionPage = () => {
  return (
    <div>
      <Layout>
       <div className={classes.container}>
       
       <p>How To Play?</p>
       <br />
       <ul className={classes.list} >
        <li>This is the demo instruction how to play!</li>
        <br />
        <li>We are working on this game..</li>
        <br />
        <li>Great you have learned how to play the game...</li>
        <br />
       </ul>

      <div className={classes.line}>

      </div>

       <ul>
        <li>This is the demo terms & conditions!</li>
        <br />
        <li>Will update this later accordingly..</li>
        <br />
        <li>Great you have gone through the conditions..</li>
        <br />
       </ul>
       
       </div>
       <Footer active={3}/>   
      </Layout>
    </div>
  )
}

export default DescriptionPage
