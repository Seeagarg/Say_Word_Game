import React from 'react'
import Home from '../Pages/Home'
import { useLocation, useRoutes } from 'react-router-dom'
import Levels from '../Pages/Levels'
import IntroPage from '../Pages/IntroPage'
import {motion, AnimatePresence } from 'framer-motion'
import EasyGamePage from '../Pages/EasyGamePage'
import MediumGamePage from '../Pages/MediumGamePage'
import HardGamePage from '../Pages/HardGamePage'
import CategoryGame from '../Pages/CategoryGame'
import DescriptionPage from '../Pages/DescriptionPage'
import Profile from '../Pages/Profile'

const Routing = () => {
    
    const routes = [
        {
            path:'/',
            element:<IntroPage/>,
        },
        {
            path:'/home',
            element:<Home/>,
        },
        {
            path:'/levels',
            element:<Levels/>,
        },
        {
            path:'/description',
            element:<DescriptionPage/>,
        },
        {
            path:'/profile',
            element:<Profile/>,
        },
        {
            path:'/easy-mode',
            element:<EasyGamePage/>,
        },
        {
            path:'/medium-mode',
            element:<MediumGamePage/>,
        },
        {
            path:'/hard-mode',
            element:<HardGamePage/>,
        },
        {
            path:'/category/:category',
            element:<CategoryGame/>,
        },

    ]

    const element = useRoutes(routes);
    const location = useLocation();

    if(!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
        {element}
        <motion.div
             initial={{ scaleX: 1 }}
             key={location.pathname}
             animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
             exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
            style={{ originX: 1 }}
            className="privacy-screen"
        />
    </AnimatePresence>

    
  )
}

export default Routing;
