import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './containers/Home'
import Entrance from './containers/Entrance'


const Router = () => {
    const routes = [
        // {
        //     path: '/',
        //     com: Home
        // },
        {
            path: '/home',
            com: Home
        },
        {
            path: '/entrance',
            com: Entrance
        }
    ]
    return (
        <HashRouter>
            <Switch>
                {
                    routes.map(({ path, com }) => <Route key={path} path={path} component={com} />)
                }
                <Redirect to='/home' />
            </Switch>
        </HashRouter>
    )
}

export default Router