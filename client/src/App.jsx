import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '../src/faviconCCL.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from './components/Login'
import MeetingRoom from './components/MeetingRoom'
import Lobby from './components/Lobby'
import { SocketProvider } from '../context/Socket'
import {
  RouterProvider,
  NavLink,
  Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from './components/Layout'
import Register from './components/Register'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path=""
        element={
          <>
            <Hero />
          </>
        }
      />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/room/:roomId" element={<MeetingRoom/>} />
      <Route path="/lobby" element={<Lobby/>} />
    </Route>
  )
);

function App() {

  return (
    <>
    <SocketProvider>
      <RouterProvider router={router} />
      </SocketProvider>
    </>
  )
}

export default App
