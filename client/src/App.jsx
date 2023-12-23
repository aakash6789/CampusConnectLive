import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '../src/faviconCCL.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
