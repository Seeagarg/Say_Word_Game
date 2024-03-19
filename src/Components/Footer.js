import React from 'react'
import classes from './Footer.module.css'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';

const Footer = ({active}) => {
  return (
    <div className={classes.container}>
   <Link to='/home' className={classes.item} >
    <div className={`${classes.icon} ${active == 1 ? classes.active : classes.inActive}`}>
        <HomeIcon fontSize='large'/>
    </div>
   </Link>
   <Link to='/levels' className={classes.item} >
    <div className={`${classes.icon} ${active == 2 ? classes.active: classes.inActive}`}>
        <VideogameAssetIcon fontSize='large'/>
    </div>
   </Link>
   <Link to='/description' className={classes.item} >
    <div className={`${classes.icon} ${active == 3 ? classes.active : classes.inActive}`}>
        <DescriptionIcon fontSize='large'/>
    </div>
   </Link>
   <Link to='/profile' className={classes.item}>
    <div className={`${classes.icon} ${active == 4 ? classes.active : classes.inActive}`} >
        <PersonIcon fontSize='large'/>
    </div>
   </Link>
    </div>
  )
}

export default Footer
