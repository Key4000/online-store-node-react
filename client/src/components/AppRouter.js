//****************************************************

//   Здесь описана логика навигации по страницам

//****************************************************

import React from 'react'
import {Routes, Route, Redirect} from 'react-router-dom'
import { AuthRoutes, publicRoutes } from '../routes'


const AppRouter = () => {
    const isAuth = true
    return (
        <Routes>
            {isAuth && AuthRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
        </Routes>
    )
}

export default AppRouter;