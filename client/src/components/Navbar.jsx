import React from "react";
import logo from '../assets/campuslogo3.jpg'
import useMediaQuery from "../hooks/useMediaQuery";

const Navbar = () => {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  return (
    <div className="fixed top-[0px] left-[0px] z-4 ">
    <nav className="h-[63px] bg-black flex w-screen text-white">
    <div className="w-[63px]">
            <img src={logo}  />
    </div> 
    <div className="flex md:ml-[70vw] ml-[50vw]">
          <div className="mt-[1.2em] mr-[5px]">
            {days[date.getDay()].substring(0,3)}
          </div>
          <div className=" mt-[1.2em]">
            {months[date.getMonth()].substring(0,3)}
          </div>
          <div className="ml-[0.4em] mt-[1.2em]">
            {date.getDate()},
          </div>
          <div className="ml-[0.4em] mt-[1.2em]">
            {date.getHours()}:
          </div>
          <div className="ml-[0.1em] mt-[1.2em] mr-[2vw]">
            {date.getMinutes()}
          </div>
          </div>
          <div className=" ml-[5vw] mt-[1.2em]">LOGIN</div>
    </nav>
    </div>
  )
}

export default Navbar;
