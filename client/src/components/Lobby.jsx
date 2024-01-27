import React, { useEffect ,useCallback} from 'react'
import { useSocket } from '../../context/SocketProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Lobby = () => {
  const socket = useSocket();
 const [email,setEmail]=useState("");
 const [room,setRoom]=useState("");
 const navigate=useNavigate();


const handleJoinRoom = useCallback(
  (data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  },
  [navigate]
);

const handleSubmitForm=useCallback((e)=>{
  e.preventDefault();
  socket.emit('room:join',{email,room})}  ,
  [socket,email,room]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  
  return (
    <div>
        <h1 className='md:w-[80vw] xs:w-[90vw] text-[3em]'>Premium video meetings now free for everyone</h1>
        <h3 className=' mt-[10vh] xs:w-[80vw]'>We re-engineered the service and made a better product that Google meet, teams and Zoom meetings</h3>
        <form onSubmit={handleSubmitForm}>
      <input  type='email' value={email} onChange={e=>setEmail(e.target.value)} className='border-black border-2 px-1 xs:mt-[5vh] md:mt-[20vh] block ml-[30vw] xs:ml-[20vw]' placeholder='Enter email-id'></input>
      <input type='text' value={room} onChange={e=>setRoom(e.target.value)} className='border-black border-2 px-1 mt-[10px] block ml-[30vw] xs:ml-[20vw]' placeholder='Enter code or link'></input>
      <button className='bg-black text-white  mt-[20px]  xs:mr-[-10vw] ml-[-37vw]' >Enter</button>
      </form>
    </div>
  )
}

export default Lobby;
