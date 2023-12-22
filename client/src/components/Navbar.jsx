import React from "react";
import logo from '../assets/campuslogo3.jpg'
const Navbar = () => {
  return (
    <div className="fixed top-[0px] left-[0px] z-4 ">
    <nav className="h-[63px] bg-black flex-row w-screen">
    <div className="w-[63px]">
            <img src={logo}  />
          </div>
    </nav>
    </div>
  )
}

export default Navbar;
