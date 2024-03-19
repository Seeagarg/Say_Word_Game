import React from 'react'
import classes from './Layout.module.css'

const Layout = ({children}) => {
  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    {children}
    </div>
    </div>
  )
}

export default Layout
