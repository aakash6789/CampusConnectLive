import React from "react";
import logo from '../assets/campuslogo3.jpg'
import useMediaQuery from "../hooks/useMediaQuery";
import { useState,useEffect } from "react";

const Navbar = () => {
  const date = new Date();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);


  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const isAboveSmallScreens = useMediaQuery("(min-width:768px)");
  return (
    <div className="fixed top-[0px] left-[0px] w-full z-10 text-[.9em] ">
    <nav className="h-[63px] bg-black flex w-full text-white">
    <div className="w-[69px]">
            <img src={logo}  />
    </div> 
    <div className="flex md:ml-[70vw] ml-[29vw] mt-[0.5em] ">
          <div className="mt-[1.2em] mr-[5px]">
            {days[date.getDay()].substring(0,3)}
          </div>
          <div className=" mt-[1.2em]">
            {months[date.getMonth()].substring(0,3)}
          </div>
          <div className="ml-[0.4em] mt-[1.2em] ">
            {date.getDate()},
          </div>
          <div className="ml-[0.1em] mt-[1.2em] mr-[2.3vw]">
          {currentTime.toLocaleTimeString().substring(0,5)}
          </div>
          </div>
          <div className="md:ml-[0.8vw] ml-[1.4vw]  mt-[1.6em] ">Contact us</div>
          <div className="md:ml-[2vw] ml-[5vw] mt-[1.6em] ">Sign in</div>
    </nav>
    </div>
  )
}

export default Navbar;
