import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Edit from './pages/edit'
import View from './pages/view'
import NotFound from './pages/404'

function App() {
 
  return (
    <>

    <Routes>
      <Route path="/view" element={<Edit/>} />
      <Route path="/edit" element={<Edit/>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
      
       
       
      
    </>
  )
}

export default App
