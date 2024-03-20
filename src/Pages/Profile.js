import React from 'react'
import Layout from '../Components/Layout'
import Footer from '../Components/Footer'
import classes from './Profile.module.css'

const Profile = () => {
  return (
    <Layout>
    <div className={classes.container}>
    <div className={classes.sub_container_1}>

   
    <p>Account Details</p>
    <div className={classes.img_container}>
    <img src="/assets/user.png" alt="" className={classes.image} />
    <p style={{fontWeight:"500"}}>+234 5678 345</p>
    </div>
    
    <div className={classes.score}>
    <img src="/assets/star.png" alt="" style={{height:"1.5rem",width:"1.5rem"}} />
    <p style={{color:"white",fontSize:"1.2rem",padding:"0rem 1rem"}}>76</p>
    </div>
    </div>

    <div className={classes.line}></div>
    <div className={classes.sub_container_2}>
    <p>Leader Board</p>
    <div className={classes.table_header}>
    <p>Rank</p>
    <p>Msisdn</p>
    <p>Points</p>
    </div>
    <div className={classes.table_item}>
    <p>1</p>
    <p>1234</p>
    <p>23</p>
    </div>
    <div className={classes.table_item}>
    <p>2</p>
    <p>3456</p>
    <p>12</p>
    </div>
    
    </div>
   


    </div>


    <Footer active={4}/>   
   </Layout>
  )
}

export default Profile
