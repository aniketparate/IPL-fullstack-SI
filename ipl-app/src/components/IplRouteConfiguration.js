import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IplNavigation from './IplNavigation'
import IplHome from '../pages/IplHome'
import IplMatchStatistics from '../pages/IplMatchStatistics'
import IplTopPlayers from '../pages/IplTopPlayers'
import IplMatchDetails from '../pages/IplMatchDetails'
import IplAddPlayers from '../pages/IplAddPlayers'

const IplRouteConfiguration = () => {
  return <BrowserRouter>
    <IplNavigation />
    <Routes>
        <Route path='/' element={<IplHome />} />
        <Route path='/getmatchstatistics' element={<IplMatchStatistics />} />
        <Route path='/gettopplayers' element={<IplTopPlayers />} />
        <Route path='/matchdetails' element={<IplMatchDetails />} />
        <Route path='/insertplayers' element={<IplAddPlayers />} />
    </Routes>
  </BrowserRouter>
}

export default IplRouteConfiguration
