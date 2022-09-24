import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddMusicRecords from '../pages/AddMusicRecords'
import EditMusicRecord from '../pages/EditMusicRecord'
// import EditMusicRecord from '../pages/EditMusicRecord.jsx'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import SingleMusicRecords from '../pages/SingleMusicRecords'
// import SingleMusicRecords from '../pages/SingleMusicRecords'

const Allroutes = () => {
  return (
    <div> <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/albums/:id" element={<SingleMusicRecords />} />
    <Route path="/albums/:id/edit" element={<EditMusicRecord />} />
    <Route path="/albums/create" element={<AddMusicRecords />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes></div>
  )
}

export default Allroutes